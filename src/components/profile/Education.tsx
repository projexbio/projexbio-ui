"use client";

import { Card, CardBody, CardHeader, Badge, Divider, Chip } from "@heroui/react";
import { FaGraduationCap, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { User } from "@/types/user";

interface EducationProps {
  user: User;
}

export default function Education({ user }: EducationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-xl" />
          <h2 className="text-xl font-semibold">Education</h2>
        </div>
      </CardHeader>
      <CardBody>
        {user.colleges && user.colleges.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {user.colleges.map((college) => (
              <Card key={college.collegeId} className="border-2 hover:border-primary-200 transition-colors">
                <CardBody className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-700 mb-1">
                        {college.name}
                      </h3>
                      {college.degreeType && (
                        <p className="text-sm text-default-600 mb-2">
                          {college.degreeType}
                        </p>
                      )}
                    </div>
                    {college.verified && (
                      <Badge
                        color="success"
                        variant="flat"
                        size="sm"
                      >
                        <FaCheckCircle className="text-xs mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <Divider className="my-3" />
                  
                  <div className="space-y-2 text-sm">
                    {college.branch && (
                      <div className="flex justify-between">
                        <span className="text-default-600">Branch:</span>
                        <span className="font-medium">{college.branch}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-default-600">Role:</span>
                      <Chip size="sm" color="secondary" variant="flat">
                        {college.userType}
                      </Chip>
                    </div>
                    {college.designation && (
                      <div className="flex justify-between">
                        <span className="text-default-600">Designation:</span>
                        <span className="font-medium">{college.designation}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-default-600">College Email:</span>
                      <span className="font-medium text-primary-600">{college.collegeEmail}</span>
                    </div>
                  </div>
                  
                  <Divider className="my-3" />
                  
                  <div className="flex items-center gap-2 text-xs text-default-500">
                    <FaCalendarAlt />
                    <span>
                      {new Date(college.joinedAt).toLocaleDateString()} - {college.leftAt ? new Date(college.leftAt).toLocaleDateString() : "Present"}
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-default-500">
            <FaGraduationCap className="mx-auto text-4xl mb-4 text-default-300" />
            <p className="text-lg font-medium">No college information available</p>
            <p className="text-sm">Add your educational background to complete your profile</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
} 