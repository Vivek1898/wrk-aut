// services/api/workflow.service.ts

export interface Workflow {
    _id: string;
    name: string;
    description?: string;
    createdBy: {
        userId: number;
        userName: string;
    };
    nodes: Array<{
        id: string;
        type: string;
        position: {
            x: number;
            y: number;
        };
        data: any;
    }>;
    edges: Array<{
        id: string;
        source: string;
        target: string;
        sourceHandle?: string;
        targetHandle?: string;
        data?: any;
    }>;
    status: 'draft' | 'active' | 'paused';
    campaignId?: number;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface WorkflowExecution {
    _id: string;
    workflowId: string;
    workflowName: string;
    status: 'running' | 'completed' | 'failed' | 'paused';
    triggeredBy: {
        userId: number;
        userName: string;
    };
    startedAt: string;
    completedAt?: string;
    targetData?: any;
    nodeExecutions: Array<{
        nodeId: string;
        nodeType: string;
        status: 'pending' | 'complete' | 'failed' | 'skipped';
        startedAt?: string;
        completedAt?: string;
        error?: string;
        result?: any;
    }>;
    currentNodeId?: string;
    error?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationResponse<T> {
    results: T[];
    total: number;
    pages: number;
    currentPage: number;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:4000';

class WorkflowService {
    private baseUrl = `${API_URL}/api/workflows`;

    private async getCSRFToken(): Promise<string> {
        const response = await fetch(`${API_URL}/get-csrf-token`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data.csrfToken;
    }

    // Fetch all workflows with optional filters
    async getWorkflows(
        page = 1,
        limit = 10,
        search?: string,
        status?: string,
        tags?: string[],
        sortField = 'createdAt',
        sortDirection = 'DESC'
    ): Promise<PaginationResponse<Workflow>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortField,
            sortDirection,
        });

        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (tags) tags.forEach(tag => params.append('tags', tag));

        const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch workflows');
        }

        return response.json();
    }

    // Get a single workflow by ID
    async getWorkflow(id: string): Promise<Workflow> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch workflow');
        }

        return response.json();
    }

    // Create a new workflow
    async createWorkflow(data: {
        name: string;
        description?: string;
        nodes?: any[];
        edges?: any[];
        tags?: string[];
    }): Promise<Workflow> {
        const csrfToken = await this.getCSRFToken();

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create workflow');
        }

        return response.json();
    }

    // Update an existing workflow
    async updateWorkflow(id: string, data: {
        name?: string;
        description?: string;
        nodes?: any[];
        edges?: any[];
        status?: 'draft' | 'active' | 'paused';
        tags?: string[];
    }): Promise<Workflow> {
        const csrfToken = await this.getCSRFToken();

        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update workflow');
        }

        return response.json();
    }

    // Delete a workflow
    async deleteWorkflow(id: string): Promise<{ success: boolean }> {
        const csrfToken = await this.getCSRFToken();

        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete workflow');
        }

        return response.json();
    }

    // Clone a workflow
    async cloneWorkflow(id: string): Promise<Workflow> {
        const csrfToken = await this.getCSRFToken();

        const response = await fetch(`${this.baseUrl}/${id}/clone`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to clone workflow');
        }

        return response.json();
    }

    // Execute a workflow
    async executeWorkflow(id: string, targetData?: any): Promise<WorkflowExecution> {
        const csrfToken = await this.getCSRFToken();

        const response = await fetch(`${this.baseUrl}/${id}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify({ targetData }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to execute workflow');
        }

        return response.json();
    }

    // Get workflow executions

    // Get all executions across all workflows
    async getAllExecutions(
        page = 1,
        limit = 10,
        status?: string,
        sortField = 'startedAt',
        sortDirection = 'DESC'
    ): Promise<PaginationResponse<WorkflowExecution>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortField,
            sortDirection,
        });

        if (status) params.append('status', status);

        const response = await fetch(`${this.baseUrl}/execution/v2?${params.toString()}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch workflow executions');
        }

        return response.json();
    }
    async getWorkflowExecutions(
        workflowId: string,
        page = 1,
        limit = 10,
        status?: string,
        sortField = 'startedAt',
        sortDirection = 'DESC'
    ): Promise<PaginationResponse<WorkflowExecution>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortField,
            sortDirection,
        });

        if (status) params.append('status', status);

        const response = await fetch(`${this.baseUrl}/${workflowId}/executions?${params.toString()}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch workflow executions');
        }

        return response.json();
    }

    // Get execution details
    async getExecution(id: string): Promise<WorkflowExecution> {
        const response = await fetch(`${this.baseUrl}/executions/${id}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch execution');
        }

        return response.json();
    }

    // Export workflow
    async exportWorkflow(id: string): Promise<Blob> {
        const response = await fetch(`${this.baseUrl}/${id}/export`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to export workflow');
        }

        return response.blob();
    }

    // Import workflow
    async importWorkflow(file: File): Promise<Workflow> {
        const csrfToken = await this.getCSRFToken();

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${this.baseUrl}/import`, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to import workflow');
        }

        return response.json();
    }
}

export const workflowService = new WorkflowService();
export default workflowService;