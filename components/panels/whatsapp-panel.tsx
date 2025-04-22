// components/panels/whatsapp-panel.tsx
"use client"

import { MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WhatsAppPanelProps {
    node: any
    onChange: (data: any) => void
    data: any
}

export default function WhatsAppPanel({ node, onChange, data }: WhatsAppPanelProps) {
    const [recipientPhone, setRecipientPhone] = useState(data.recipientPhone || "")
    const [message, setMessage] = useState(data.message || "")
    const [recipientSource, setRecipientSource] = useState(data.recipientSource || "manual")
    const [messageType, setMessageType] = useState(data.messageType || "text")
    const [templateName, setTemplateName] = useState(data.templateName || "")
    const [templateParams, setTemplateParams] = useState(data.templateParams || "")

    // Update the parent component's state when any value changes
    const updateParentState = () => {
        onChange({
            recipientPhone,
            message,
            recipientSource,
            messageType,
            templateName,
            templateParams,
        });
    }

    const handleRecipientSourceChange = (value: string) => {
        setRecipientSource(value);
        onChange({
            recipientPhone,
            message,
            recipientSource: value,
            messageType,
            templateName,
            templateParams,
        });
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientPhone(e.target.value);
        onChange({
            recipientPhone: e.target.value,
            message,
            recipientSource,
            messageType,
            templateName,
            templateParams,
        });
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        onChange({
            recipientPhone,
            message: e.target.value,
            recipientSource,
            messageType,
            templateName,
            templateParams,
        });
    }

    const handleMessageTypeChange = (value: string) => {
        setMessageType(value);
        onChange({
            recipientPhone,
            message,
            recipientSource,
            messageType: value,
            templateName,
            templateParams,
        });
    }

    const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateName(e.target.value);
        onChange({
            recipientPhone,
            message,
            recipientSource,
            messageType,
            templateName: e.target.value,
            templateParams,
        });
    }

    const handleTemplateParamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTemplateParams(e.target.value);
        onChange({
            recipientPhone,
            message,
            recipientSource,
            messageType,
            templateName,
            templateParams: e.target.value,
        });
    }

    return (
        <div className="p-4">
            <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 mr-2 text-green-700" />
                <h2 className="text-xl font-bold">WhatsApp Configuration</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Recipient Source</label>
                    <Select
                        value={recipientSource}
                        onValueChange={handleRecipientSourceChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select recipient source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="manual">Enter Phone Number Manually</SelectItem>
                            {/*<SelectItem value="event">From Trigger Event</SelectItem>*/}
                            {/*<SelectItem value="user">User's WhatsApp</SelectItem>*/}
                        </SelectContent>
                    </Select>
                </div>

                {recipientSource === "manual" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Recipient Phone Number</label>
                        <Input
                            placeholder="Enter WhatsApp number (e.g. +1234567890)..."
                            value={recipientPhone}
                            onChange={handlePhoneChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter full phone number with country code, e.g., +12025550123
                        </p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">Message Type</label>
                    <Tabs value={messageType} onValueChange={handleMessageTypeChange}>
                        <TabsList className="grid w-full grid-cols-1">
                            <TabsTrigger value="text">Free Text</TabsTrigger>
                            {/*<TabsTrigger value="template">Template</TabsTrigger>*/}
                        </TabsList>

                        <TabsContent value="text" className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <Textarea
                                    placeholder="Enter your message..."
                                    value={message}
                                    onChange={handleMessageChange}
                                    className="min-h-[150px]"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-1">Variables</p>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const newMessage = message + "{{user.name}}";
                                            setMessage(newMessage);
                                            onChange({
                                                recipientPhone,
                                                message: newMessage,
                                                recipientSource,
                                                messageType,
                                                templateName,
                                                templateParams,
                                            });
                                        }}
                                    >
                                        User Name
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const newMessage = message + "{{user.email}}";
                                            setMessage(newMessage);
                                            onChange({
                                                recipientPhone,
                                                message: newMessage,
                                                recipientSource,
                                                messageType,
                                                templateName,
                                                templateParams,
                                            });
                                        }}
                                    >
                                        User Email
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const newMessage = message + "{{event.data}}";
                                            setMessage(newMessage);
                                            onChange({
                                                recipientPhone,
                                                message: newMessage,
                                                recipientSource,
                                                messageType,
                                                templateName,
                                                templateParams,
                                            });
                                        }}
                                    >
                                        Event Data
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="template" className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Template Name</label>
                                <Input
                                    placeholder="Enter template name..."
                                    value={templateName}
                                    onChange={handleTemplateNameChange}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Must match a template name in your WhatsApp Business Account
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Template Parameters (JSON)</label>
                                <Textarea
                                    placeholder='{"param1": "value1", "param2": "value2"}'
                                    value={templateParams}
                                    onChange={handleTemplateParamsChange}
                                    className="min-h-[100px] font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter parameters as JSON object
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}