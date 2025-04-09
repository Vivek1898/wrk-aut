// "use client"
//
// import React, { memo } from 'react';
// import { Handle, Position } from 'reactflow';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Play } from 'lucide-react';
//
// // Define supported event types in human-readable format with their keys
// export const SUPPORTED_EVENTS = [
//     { label: 'User Created', value: 'USER_CREATED' },
//     { label: 'User Updated', value: 'USER_UPDATED' },
//     { label: 'User Deleted', value: 'USER_DELETED' },
//     { label: 'User Profile Updated', value: 'USER_PROFILE_UPDATED' },
//     { label: 'User Invited', value: 'USER_INVITED' },
//     { label: 'User Invitation Accepted', value: 'USER_INVITATION_ACCEPTED' },
//
//     { label: 'Folder Created', value: 'FOLDER_CREATED' },
//     { label: 'Folder Updated', value: 'FOLDER_UPDATED' },
//     { label: 'Folder Deleted', value: 'FOLDER_DELETED' },
//
//     { label: 'Hospital Created', value: 'HOSPITAL_CREATED' },
//     { label: 'Hospital Updated', value: 'HOSPITAL_UPDATED' },
//     { label: 'Hospital Deleted', value: 'HOSPITAL_DELETED' },
//     { label: 'Hospital Removed', value: 'HOSPITAL_REMOVED' },
//
//     { label: 'Password Reset', value: 'PASSWORD_RESET' },
//     { label: 'Password Reset Email Sent', value: 'PASSWORD_RESET_EMAIL_SENT' },
//     { label: 'Forgot Password Email Sent', value: 'FORGOT_PASSWORD_EMAIL_SENT' },
//
//     { label: 'Asset Created', value: 'ASSET_CREATED' },
//     { label: 'Asset Updated', value: 'ASSET_UPDATED' },
//     { label: 'Asset Deleted', value: 'ASSET_DELETED' },
//
//     { label: 'Pet Created', value: 'PET_CREATED' },
//     { label: 'Pet Updated', value: 'PET_UPDATED' },
//     { label: 'Pet Deleted', value: 'PET_DELETED' },
//
//     { label: 'Service Created', value: 'SERVICE_CREATED' },
//     { label: 'Service Updated', value: 'SERVICE_UPDATED' },
//     { label: 'Service Deleted', value: 'SERVICE_DELETED' },
//     { label: 'Service Duplicated', value: 'SERVICE_DUPLICATED' },
//
//     { label: 'Region Created', value: 'REGION_CREATED' },
//     { label: 'Region Updated', value: 'REGION_UPDATED' },
//     { label: 'Region Deleted', value: 'REGION_DELETED' },
//
//     { label: 'Blog Created', value: 'BLOG_CREATED' },
//     { label: 'Blog Updated', value: 'BLOG_UPDATED' },
//     { label: 'Blog Deleted', value: 'BLOG_DELETED' },
//
//     { label: 'FAQ Created', value: 'FAQ_CREATED' },
//     { label: 'FAQ Updated', value: 'FAQ_UPDATED' },
//     { label: 'FAQ Deleted', value: 'FAQ_DELETED' },
//
//     { label: 'Vet Created', value: 'VET_CREATED' },
//     { label: 'Vet Updated', value: 'VET_UPDATED' },
//     { label: 'Vet Deleted', value: 'VET_DELETED' },
//
//     { label: 'Website Created', value: 'WEBSITE_CREATED' },
//     { label: 'Website Updated', value: 'WEBSITE_UPDATED' },
//     { label: 'Website Deleted', value: 'WEBSITE_DELETED' },
//     { label: 'Website Status Changed', value: 'WEBSITE_STATUS_CHANGED' },
//
//     { label: 'Testimonial Created', value: 'TESTIMONIAL_CREATED' },
//     { label: 'Testimonial Updated', value: 'TESTIMONIAL_UPDATED' },
//     { label: 'Testimonial Deleted', value: 'TESTIMONIAL_DELETED' },
//
//     { label: 'Banner Created', value: 'BANNER_CREATED' },
//     { label: 'Banner Updated', value: 'BANNER_UPDATED' },
//     { label: 'Banner Deleted', value: 'BANNER_DELETED' },
// ];
//
// function TriggerNode({ data, id, selected }) {
//     const eventCount = data.events?.length || 0;
//
//     return (
//         <div className="trigger-node rounded-md shadow-md bg-white border-2 border-blue-500">
//             <Handle type="source" position={Position.Bottom} id="a" />
//
//             <Card className="w-full border-0 shadow-none">
//                 <CardHeader className="bg-blue-50 p-3">
//                     <div className="flex items-center gap-2">
//                         <Play className="h-4 w-4 text-blue-500" />
//                         <CardTitle className="text-sm font-medium">{data.label || 'Trigger'}</CardTitle>
//                     </div>
//                     <CardDescription className="text-xs">
//                         {eventCount === 0
//                             ? 'Workflow starts when triggered by events'
//                             : `Triggered by ${eventCount} ${eventCount === 1 ? 'event' : 'events'}`
//                         }
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-3">
//                     {data.events && data.events.length > 0 ? (
//                         <div className="flex flex-wrap gap-1">
//                             {data.events.slice(0, 3).map((event) => (
//                                 <Badge key={event.value} variant="outline" className="text-xs">
//                                     {event.label}
//                                 </Badge>
//                             ))}
//                             {data.events.length > 3 && (
//                                 <Badge variant="outline" className="text-xs">
//                                     +{data.events.length - 3} more
//                                 </Badge>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="text-xs text-gray-500">
//                             Click to set up event triggers
//                         </div>
//                     )}
//                     <div className="mt-2">
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="w-full text-xs mt-1"
//                         >
//                             {data.buttonText || 'Configure Trigger'}
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
//
// export default memo(TriggerNode);


"use client"

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

// Define supported event types in human-readable format with their keys
export const SUPPORTED_EVENTS = [
    { label: 'User Created', value: 'USER_CREATED' },
    { label: 'User Updated', value: 'USER_UPDATED' },
    { label: 'User Deleted', value: 'USER_DELETED' },
    { label: 'User Profile Updated', value: 'USER_PROFILE_UPDATED' },
    { label: 'User Invited', value: 'USER_INVITED' },
    { label: 'User Invitation Accepted', value: 'USER_INVITATION_ACCEPTED' },

    { label: 'Folder Created', value: 'FOLDER_CREATED' },
    { label: 'Folder Updated', value: 'FOLDER_UPDATED' },
    { label: 'Folder Deleted', value: 'FOLDER_DELETED' },

    { label: 'Hospital Created', value: 'HOSPITAL_CREATED' },
    { label: 'Hospital Updated', value: 'HOSPITAL_UPDATED' },
    { label: 'Hospital Deleted', value: 'HOSPITAL_DELETED' },
    { label: 'Hospital Removed', value: 'HOSPITAL_REMOVED' },

    { label: 'Password Reset', value: 'PASSWORD_RESET' },
    { label: 'Password Reset Email Sent', value: 'PASSWORD_RESET_EMAIL_SENT' },
    { label: 'Forgot Password Email Sent', value: 'FORGOT_PASSWORD_EMAIL_SENT' },

    { label: 'Asset Created', value: 'ASSET_CREATED' },
    { label: 'Asset Updated', value: 'ASSET_UPDATED' },
    { label: 'Asset Deleted', value: 'ASSET_DELETED' },

    { label: 'Pet Created', value: 'PET_CREATED' },
    { label: 'Pet Updated', value: 'PET_UPDATED' },
    { label: 'Pet Deleted', value: 'PET_DELETED' },

    { label: 'Service Created', value: 'SERVICE_CREATED' },
    { label: 'Service Updated', value: 'SERVICE_UPDATED' },
    { label: 'Service Deleted', value: 'SERVICE_DELETED' },
    { label: 'Service Duplicated', value: 'SERVICE_DUPLICATED' },

    { label: 'Region Created', value: 'REGION_CREATED' },
    { label: 'Region Updated', value: 'REGION_UPDATED' },
    { label: 'Region Deleted', value: 'REGION_DELETED' },

    { label: 'Blog Created', value: 'BLOG_CREATED' },
    { label: 'Blog Updated', value: 'BLOG_UPDATED' },
    { label: 'Blog Deleted', value: 'BLOG_DELETED' },

    { label: 'FAQ Created', value: 'FAQ_CREATED' },
    { label: 'FAQ Updated', value: 'FAQ_UPDATED' },
    { label: 'FAQ Deleted', value: 'FAQ_DELETED' },

    { label: 'Vet Created', value: 'VET_CREATED' },
    { label: 'Vet Updated', value: 'VET_UPDATED' },
    { label: 'Vet Deleted', value: 'VET_DELETED' },

    { label: 'Website Created', value: 'WEBSITE_CREATED' },
    { label: 'Website Updated', value: 'WEBSITE_UPDATED' },
    { label: 'Website Deleted', value: 'WEBSITE_DELETED' },
    { label: 'Website Status Changed', value: 'WEBSITE_STATUS_CHANGED' },

    { label: 'Testimonial Created', value: 'TESTIMONIAL_CREATED' },
    { label: 'Testimonial Updated', value: 'TESTIMONIAL_UPDATED' },
    { label: 'Testimonial Deleted', value: 'TESTIMONIAL_DELETED' },

    { label: 'Banner Created', value: 'BANNER_CREATED' },
    { label: 'Banner Updated', value: 'BANNER_UPDATED' },
    { label: 'Banner Deleted', value: 'BANNER_DELETED' },
];

function TriggerNode({ data, id, selected }) {
    const eventCount = data.events?.length || 0;

    return (
        <div className="trigger-node rounded-md shadow-md bg-white border-2 border-blue-500">
            {/* Only include source handle as the trigger is a starting point */}
            <Handle
                type="target"
                position={Position.Top}
                id="a"
                style={{ bottom: -8, background: "#555" }}
            />

            <Card className="w-full border-0 shadow-none">
                <CardHeader className="bg-blue-50 p-3">
                    <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-blue-500" />
                        <CardTitle className="text-sm font-medium">{data.label || 'Trigger'}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                        {eventCount === 0
                            ? 'Workflow starts when triggered by events'
                            : `Triggered by ${eventCount} ${eventCount === 1 ? 'event' : 'events'}`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                    {data.events && data.events.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {data.events.slice(0, 3).map((event) => (
                                <Badge key={event.value} variant="outline" className="text-xs">
                                    {event.label}
                                </Badge>
                            ))}
                            {data.events.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{data.events.length - 3} more
                                </Badge>
                            )}
                        </div>
                    ) : (
                        <div className="text-xs text-gray-500">
                            Click to set up event triggers
                        </div>
                    )}
                    <div className="mt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs mt-1"
                        >
                            {data.buttonText || 'Configure Trigger'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={{ bottom: -8, background: "#555" }}
            />
        </div>
    );
}

export default memo(TriggerNode);