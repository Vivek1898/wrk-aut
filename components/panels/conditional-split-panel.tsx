"use client"

import { GitBranch, PlusIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface ConditionalSplitPanelProps {
  node: any
  onChange: (data: any) => void
  data: any
}

// Organize event types into categories
const eventCategories = [
  {
    name: "User Management",
    events: [
      { value: "USER_CREATED", label: "User Created" },
      { value: "USER_UPDATED", label: "User Updated" },
      { value: "USER_DELETED", label: "User Deleted" },
      { value: "USER_PROFILE_UPDATED", label: "User Profile Updated" },
      { value: "USERS_EXPORTED", label: "Users Exported" },
      { value: "USER_ACTIVITIES_EXPORTED", label: "User Activities Exported" },
      { value: "USER_INVITED", label: "User Invited" },
      { value: "USER_INVITATION_ACCEPTED", label: "User Invitation Accepted" },
      { value: "USER_INVITATION_RESCHEDULED", label: "User Invitation Rescheduled" },
      { value: "USER_INVITATIONS_EXPORTED", label: "User Invitations Exported" },
    ],
  },
  {
    name: "Authentication",
    events: [
      { value: "PASSWORD_RESET_EMAIL_SENT", label: "Password Reset Email Sent" },
      { value: "FORGOT_PASSWORD_EMAIL_SENT", label: "Forgot Password Email Sent" },
      { value: "PASSWORD_RESET", label: "Password Reset" },
    ],
  },
  {
    name: "Hospital Management",
    events: [
      { value: "HOSPITAL_CREATED", label: "Hospital Created" },
      { value: "HOSPITAL_UPDATED", label: "Hospital Updated" },
      { value: "HOSPITAL_DELETED", label: "Hospital Deleted" },
      { value: "HOSPITAL_REMOVED", label: "Hospital Removed" },
    ],
  },
  {
    name: "Pet Management",
    events: [
      { value: "PET_CREATED", label: "Pet Created" },
      { value: "PET_UPDATED", label: "Pet Updated" },
      { value: "PET_DELETED", label: "Pet Deleted" },
      { value: "PETS_EXPORTED", label: "Pets Exported" },
    ],
  },
  {
    name: "Veterinarian Management",
    events: [
      { value: "VET_CREATED", label: "Vet Created" },
      { value: "VET_UPDATED", label: "Vet Updated" },
      { value: "VET_DELETED", label: "Vet Deleted" },
      { value: "VET_SPECIALIZATION_CREATED", label: "Vet Specialization Created" },
      { value: "VET_SPECIALIZATION_UPDATED", label: "Vet Specialization Updated" },
      { value: "VET_SPECIALIZATION_DELETED", label: "Vet Specialization Deleted" },
      { value: "VETS_EXPORTED", label: "Vets Exported" },
    ],
  },
  {
    name: "Service Management",
    events: [
      { value: "SERVICE_CREATED", label: "Service Created" },
      { value: "SERVICE_UPDATED", label: "Service Updated" },
      { value: "SERVICE_DELETED", label: "Service Deleted" },
      { value: "SERVICE_DUPLICATED", label: "Service Duplicated" },
      { value: "SERVICE_CATEGORY_CREATED", label: "Service Category Created" },
      { value: "SERVICE_CATEGORY_UPDATED", label: "Service Category Updated" },
      { value: "SERVICE_CATEGORY_DELETED", label: "Service Category Deleted" },
      { value: "SERVICE_CATEGORIES_EXPORTED", label: "Service Categories Exported" },
    ],
  },
  {
    name: "Content Management",
    events: [
      { value: "CONTENT_CREATED", label: "Content Created" },
      { value: "CONTENT_UPDATED", label: "Content Updated" },
      { value: "CONTENT_DELETED", label: "Content Deleted" },
      { value: "CONTENT_TAG_CREATED", label: "Content Tag Created" },
      { value: "CONTENT_TAG_UPDATED", label: "Content Tag Updated" },
      { value: "CONTENT_TAG_DELETED", label: "Content Tag Deleted" },
      { value: "CONTENT_CATEGORY_CREATED", label: "Content Category Created" },
      { value: "CONTENT_CATEGORY_UPDATED", label: "Content Category Updated" },
      { value: "CONTENT_CATEGORY_DELETED", label: "Content Category Deleted" },
    ],
  },
  {
    name: "Blog Management",
    events: [
      { value: "BLOG_CREATED", label: "Blog Created" },
      { value: "BLOG_UPDATED", label: "Blog Updated" },
      { value: "BLOG_DELETED", label: "Blog Deleted" },
      { value: "BLOG_CATEGORY_CREATED", label: "Blog Category Created" },
      { value: "BLOG_CATEGORY_UPDATED", label: "Blog Category Updated" },
      { value: "BLOG_CATEGORY_DELETED", label: "Blog Category Deleted" },
      { value: "BLOG_TAG_CREATED", label: "Blog Tag Created" },
      { value: "BLOG_TAG_UPDATED", label: "Blog Tag Updated" },
      { value: "BLOG_TAG_DELETED", label: "Blog Tag Deleted" },
    ],
  },
  {
    name: "Website Management",
    events: [
      { value: "WEBSITE_CREATED", label: "Website Created" },
      { value: "WEBSITE_UPDATED", label: "Website Updated" },
      { value: "WEBSITE_DELETED", label: "Website Deleted" },
      { value: "WEBSITE_ALLOCATED", label: "Website Allocated" },
      { value: "WEBSITE_DEALLOCATED", label: "Website Deallocated" },
      { value: "WEBSITE_STATUS_CHANGED", label: "Website Status Changed" },
    ],
  },
  {
    name: "Website Content",
    events: [
      { value: "TESTIMONIAL_CREATED", label: "Testimonial Created" },
      { value: "TESTIMONIAL_UPDATED", label: "Testimonial Updated" },
      { value: "TESTIMONIAL_DELETED", label: "Testimonial Deleted" },
      { value: "BANNER_CREATED", label: "Banner Created" },
      { value: "BANNER_UPDATED", label: "Banner Updated" },
      { value: "BANNER_DELETED", label: "Banner Deleted" },
      { value: "FAQ_CREATED", label: "FAQ Created" },
      { value: "FAQ_UPDATED", label: "FAQ Updated" },
      { value: "FAQ_DELETED", label: "FAQ Deleted" },
    ],
  },
  {
    name: "File Management",
    events: [
      { value: "FOLDER_CREATED", label: "Folder Created" },
      { value: "FOLDER_UPDATED", label: "Folder Updated" },
      { value: "FOLDER_DELETED", label: "Folder Deleted" },
      { value: "ASSET_CREATED", label: "Asset Created" },
      { value: "ASSET_UPDATED", label: "Asset Updated" },
      { value: "ASSET_DELETED", label: "Asset Deleted" },
    ],
  },
  {
    name: "System",
    events: [
      { value: "AUDIT_REPORT_EXPORTED", label: "Audit Report Exported" },
      { value: "REGION_CREATED", label: "Region Created" },
      { value: "REGION_UPDATED", label: "Region Updated" },
      { value: "REGION_DELETED", label: "Region Deleted" },
      { value: "VERSION_CREATED", label: "Version Created" },
      { value: "VERSION_REVERTED", label: "Version Reverted" },
      { value: "ENTITY_ASSIGNED", label: "Entity Assigned" },
      { value: "ENTITY_REMOVED", label: "Entity Removed" },
      { value: "POLICY_CREATED", label: "Policy Created" },
      { value: "POLICY_UPDATED", label: "Policy Updated" },
      { value: "POLICY_DELETED", label: "Policy Deleted" },
      { value: "PLATFORM_SETTINGS_UPDATED", label: "Platform Settings Updated" },
    ],
  },
  {
    name: "Marketing",
    events: [
      { value: "UTM_CREATED", label: "UTM Created" },
      { value: "UTM_UPDATED", label: "UTM Updated" },
      { value: "UTM_DELETED", label: "UTM Deleted" },
      { value: "UTMS_EXPORTED", label: "UTMs Exported" },
    ],
  },
]

// Available condition properties
const conditionProperties = [
  { value: "event", label: "Event" },
  { value: "hasResponded", label: "Has responded" },
  { value: "hasNotResponded", label: "Has not responded" },
  { value: "veryInterested", label: "Very interested" },
  { value: "hasTag", label: "Has a certain tag" },
  { value: "partOfList", label: "Part of a list" },
  { value: "field", label: "field" },
]

// Available operators
const operators = [
  { value: "equals", label: "equals" },
  { value: "notEquals", label: "does not equal" },
  { value: "contains", label: "contains" },
  { value: "greaterThan", label: "greater than" },
  { value: "lessThan", label: "less than" },
  { value: "in", label: "in" },
]

export default function ConditionalSplitPanel({ node, onChange, data }: ConditionalSplitPanelProps) {
  const [conditions, setConditions] = useState(
    data.conditions || [
      {
        type: "AND",
        not: false,
        rules: [{ property: "event", operator: "equals", value: "" }],
        groups: [],
      },
    ],
  )

  const addRule = (groupIndex: number) => {
    const newConditions = [...conditions]
    if (!newConditions[groupIndex].rules) {
      newConditions[groupIndex].rules = []
    }
    newConditions[groupIndex].rules.push({ property: "event", operator: "equals", value: "" })
    setConditions(newConditions)
  }

  const updateRule = (groupIndex: number, ruleIndex: number, field: string, value: any) => {
    const newConditions = [...conditions]
    newConditions[groupIndex].rules[ruleIndex][field] = value
    setConditions(newConditions)
  }

  const removeRule = (groupIndex: number, ruleIndex: number) => {
    const newConditions = [...conditions]
    newConditions[groupIndex].rules.splice(ruleIndex, 1)
    setConditions(newConditions)
  }

  const addGroup = (parentIndex = -1) => {
    if (parentIndex === -1) {
      setConditions([
        ...conditions,
        { type: "AND", not: false, rules: [{ property: "event", operator: "equals", value: "" }], groups: [] },
      ])
    } else {
      const newConditions = [...conditions]
      if (!newConditions[parentIndex].groups) {
        newConditions[parentIndex].groups = []
      }
      newConditions[parentIndex].groups.push({
        type: "AND",
        not: false,
        rules: [{ property: "event", operator: "equals", value: "" }],
        groups: [],
      })
      setConditions(newConditions)
    }
  }

  const removeGroup = (index: number) => {
    const newConditions = [...conditions]
    newConditions.splice(index, 1)
    setConditions(newConditions)
  }

  const toggleNot = (index: number) => {
    const newConditions = [...conditions]
    newConditions[index].not = !newConditions[index].not
    setConditions(newConditions)
  }

  const changeType = (index: number, type: string) => {
    const newConditions = [...conditions]
    newConditions[index].type = type
    setConditions(newConditions)
  }

  const handleSave = () => {
    onChange({
      conditions,
    })
  }

  // Render event selection based on property type
  const renderValueField = (groupIndex: number, ruleIndex: number, rule: any) => {
    if (rule.property === "event") {
      return (
        <Select value={rule.value} onValueChange={(value) => updateRule(groupIndex, ruleIndex, "value", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {eventCategories.map((category) => (
              <SelectGroup key={category.name}>
                <SelectLabel>{category.name}</SelectLabel>
                {category.events.map((event) => (
                  <SelectItem key={event.value} value={event.value}>
                    {event.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      )
    }

    return (
      <Input
        placeholder="Value"
        value={rule.value}
        onChange={(e) => updateRule(groupIndex, ruleIndex, "value", e.target.value)}
      />
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <GitBranch className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">Conditional split details</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Create a split in your flow based on events or user properties. Set up automated actions that trigger when
          specific events occur.
        </p>

        <div className="border rounded-md p-4">
          {conditions.map((condition, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Select value={condition.type} onValueChange={(value) => changeType(groupIndex, value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">AND</SelectItem>
                    <SelectItem value="OR">OR</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`not-${groupIndex}`}
                    checked={condition.not}
                    onCheckedChange={() => toggleNot(groupIndex)}
                  />
                  <label htmlFor={`not-${groupIndex}`} className="text-sm">
                    Not
                  </label>
                </div>
                <Button variant="outline" size="sm" onClick={() => addRule(groupIndex)}>
                  <PlusIcon className="h-4 w-4 mr-1" /> Rule
                </Button>
              </div>

              {/* Rules for this condition group */}
              {condition.rules &&
                condition.rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="mb-4 pl-2 border-l-2 border-gray-200">
                    <div className="grid grid-cols-12 gap-2 mb-2">
                      <div className="col-span-4">
                        <Select
                          value={rule.property}
                          onValueChange={(value) => updateRule(groupIndex, ruleIndex, "property", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {conditionProperties.map((prop) => (
                              <SelectItem key={prop.value} value={prop.value}>
                                {prop.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3">
                        <Select
                          value={rule.operator}
                          onValueChange={(value) => updateRule(groupIndex, ruleIndex, "operator", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {operators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4">{renderValueField(groupIndex, ruleIndex, rule)}</div>
                      <div className="col-span-1 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRule(groupIndex, ruleIndex)}
                          className="h-8 w-8 p-0"
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => addGroup(groupIndex)}
                >
                  <PlusIcon className="h-4 w-4 mr-1" /> Group
                </Button>
              </div>

              {groupIndex > 0 && (
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeGroup(groupIndex)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button variant="outline" size="sm" className="w-full justify-start mt-4" onClick={() => addGroup()}>
            <PlusIcon className="h-4 w-4 mr-1" /> Group
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Button className="w-full" onClick={handleSave}>
          Save Conditions
        </Button>
      </div>
    </div>
  )
}
