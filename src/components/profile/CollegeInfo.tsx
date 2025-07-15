"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Avatar,
  Badge,
  Divider,
} from "@heroui/react";
import {
  FaCheckCircle,
  FaGraduationCap,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { College } from "@/types/profile";

interface CollegeInfoProps {
  colleges: College[];
}

export default function CollegeInfo({ colleges }: CollegeInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "STUDENT":
        return "primary";
      case "FACULTY":
        return "success";
      case "ALUMNI":
        return "warning";
      default:
        return "default";
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "STUDENT":
        return "👨‍🎓";
      case "FACULTY":
        return "👨‍🏫";
      case "ALUMNI":
        return "🎓";
      default:
        return "👤";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaGraduationCap className="text-primary" />
          Education
        </h3>
      </CardHeader>

      <CardBody>
        {colleges.length === 0 ? (
          <div className="text-center py-8 text-default-500">
            <FaGraduationCap size={48} className="mx-auto mb-4 opacity-50" />
            <p>No education information available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {colleges.map((college, index) => (
              <div key={college.collegeId}>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* College Logo */}
                  <div className="flex-shrink-0">
                    <Avatar
                      src={college.logoUrl || undefined}
                      name={college.name}
                      size="lg"
                      className="w-16 h-16"
                    />
                  </div>

                  {/* College Details */}
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold">
                            {college.name}
                          </h4>
                          {college.verified && (
                            <Badge
                              content={<FaCheckCircle size={12} />}
                              color="success"
                              placement="top-right"
                              className="border-0"
                            >
                              <Chip size="sm" variant="flat" color="success">
                                Verified
                              </Chip>
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Chip
                            size="sm"
                            color={getUserTypeColor(college.userType)}
                            variant="flat"
                            startContent={
                              <span>{getUserTypeIcon(college.userType)}</span>
                            }
                          >
                            {college.userType}
                          </Chip>
                          {college.isAdmin && (
                            <Chip size="sm" color="warning" variant="flat">
                              Admin
                            </Chip>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Academic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-default-700">Degree</p>
                        <p className="text-default-600">{college.degreeType}</p>
                      </div>
                      <div>
                        <p className="font-medium text-default-700">Branch</p>
                        <p className="text-default-600">{college.branch}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-default-400" />
                        <span className="font-medium">Joined:</span>
                        <span className="text-default-600">
                          {formatDate(college.joinedAt)}
                        </span>
                      </div>
                      {college.leftAt && (
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-default-400" />
                          <span className="font-medium">Left:</span>
                          <span className="text-default-600">
                            {formatDate(college.leftAt)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* College Email */}
                    {college.collegeEmail && (
                      <div className="flex items-center gap-2 text-sm">
                        <FaEnvelope className="text-default-400" />
                        <span className="font-medium">College Email:</span>
                        <a
                          href={`mailto:${college.collegeEmail}`}
                          className="text-primary hover:underline"
                        >
                          {college.collegeEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider between colleges */}
                {index < colleges.length - 1 && <Divider className="mt-6" />}
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
