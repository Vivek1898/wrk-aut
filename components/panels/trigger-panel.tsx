"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search } from 'lucide-react';
import {SUPPORTED_EVENTS} from "@/components/nodes/trigger-node";
// import { SUPPORTED_EVENTS } from "./trigger-node";

export default function TriggerPanel({ node, onChange, data }) {
    const [triggerType, setTriggerType] = useState(data.triggerType || 'event');
    const [triggerMode, setTriggerMode] = useState(data.triggerMode || 'any'); // 'any' = OR, 'all' = AND
    const [selectedEvents, setSelectedEvents] = useState(data.events || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [customName, setCustomName] = useState(data.customName || '');

    // Filter events based on search term
    const filteredEvents = SUPPORTED_EVENTS.filter(event =>
        event.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEventToggle = (event) => {
        // Check if the event is already selected
        const isSelected = selectedEvents.some(e => e.value === event.value);

        let updatedEvents;
        if (isSelected) {
            // Remove the event
            updatedEvents = selectedEvents.filter(e => e.value !== event.value);
        } else {
            // Add the event
            updatedEvents = [...selectedEvents, event];
        }

        setSelectedEvents(updatedEvents);

        // Update parent component
        onChange({
            triggerType,
            triggerMode,
            events: updatedEvents,
            customName: customName.trim() || 'Trigger',
            label: customName.trim() || 'Trigger',
            buttonText: 'Edit Trigger'
        });
    };

    const handleModeChange = (value) => {
        setTriggerMode(value);

        // Update parent component
        onChange({
            triggerType,
            triggerMode: value,
            events: selectedEvents,
            customName: customName.trim() || 'Trigger',
            label: customName.trim() || 'Trigger',
            buttonText: 'Edit Trigger'
        });
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setCustomName(value);

        // Update parent component
        onChange({
            triggerType,
            triggerMode,
            events: selectedEvents,
            customName: value.trim() || 'Trigger',
            label: value.trim() || 'Trigger',
            buttonText: 'Edit Trigger'
        });
    };

    return (
        <div className="p-4 space-y-4 overflow-y-auto h-full">
            <h2 className="text-lg font-bold">Configure Trigger</h2>

            <div className="space-y-2">
                <Label htmlFor="custom-name">Trigger Name (Optional)</Label>
                <Input
                    id="custom-name"
                    placeholder="E.g., New User Signup"
                    value={customName}
                    onChange={handleNameChange}
                />
            </div>

            <Tabs defaultValue="event" onValueChange={setTriggerType} value={triggerType}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="event">Events</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>

                <TabsContent value="event" className="space-y-4">
                    <Card>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                <Label>Trigger Logic</Label>
                                <RadioGroup
                                    value={triggerMode}
                                    onValueChange={handleModeChange}
                                    className="flex flex-row gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="any" id="any" />
                                        <Label htmlFor="any">Any event occurs (OR)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="all" />
                                        <Label htmlFor="all">All events occur (AND)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search events..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="border rounded-md h-64 overflow-y-auto p-2">
                            <div className="space-y-2">
                                {filteredEvents.map(event => (
                                    <div key={event.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={event.value}
                                            checked={selectedEvents.some(e => e.value === event.value)}
                                            onCheckedChange={() => handleEventToggle(event)}
                                        />
                                        <Label htmlFor={event.value} className="cursor-pointer text-sm">
                                            {event.label}
                                        </Label>
                                    </div>
                                ))}
                                {filteredEvents.length === 0 && (
                                    <div className="text-center py-4 text-muted-foreground">
                                        No events found matching your search.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Selected Events: {selectedEvents.length}</p>
                        <p className="text-xs text-muted-foreground">
                            {triggerMode === 'any'
                                ? 'Workflow will start when any of the selected events occur.'
                                : 'Workflow will start only when all selected events have occurred.'}
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                    <div className="flex flex-col gap-2 p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground">
                            Schedule-based triggers will be implemented in a future update.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="api" className="space-y-4">
                    <div className="flex flex-col gap-2 p-4 border rounded-md">
                        <p className="text-sm text-muted-foreground">
                            API-based triggers will be implemented in a future update.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}