"use client";

import { Card, CardBody, Avatar, Badge } from "@heroui/react";
import { FaEnvelope, FaGlobe, FaFileAlt, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { User } from "@/types/user";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  // Helper function to get social media icon
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'linkedin':
        return <FaLinkedin />;
      case 'github':
        return <FaGithub />;
      case 'twitter':
        return <FaTwitter />;
      case 'instagram':
        return <FaInstagram />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return <FaGlobe />;
    }
  };

  return (
    <Card className="border-primary-200">
      <CardBody className="p-8">
        <div className="space-y-8">
          {/* Top Row - Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Left - Avatar and Username */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-center gap-3">
              <Avatar
                src={user.avatarUrl}
                name={`${user.firstName} ${user.lastName}`}
                size="lg"
                className="w-32 h-32 text-large"
              />
              <div className="text-center md:text-left">
                <span className="font-medium text-default-600">@{user.username}</span>
              </div>
            </div>

            {/* Right - Name, Tagline, and Bio */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h1>
                {user.isSuperAdmin && (
                  <Badge color="danger" variant="flat" size="sm">
                    Super Admin
                  </Badge>
                )}
              </div>
              
              {/* Tagline */}
              {user.tagline ? (
                <p className="text-lg text-primary-600 font-medium">
                  {user.tagline}
                </p>
              ) : (
                <p className="text-default-400 italic text-sm">
                  Add a tagline to describe yourself...
                </p>
              )}
              
              {/* Bio */}
              {user.bio ? (
                <p className="text-default-700 text-sm leading-relaxed">
                  {user.bio}
                </p>
              ) : (
                <p className="text-default-400 italic text-sm">
                  Add a bio to tell others about yourself...
                </p>
              )}

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-default-700">Skills:</h3>
                  {user.skills && user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <Badge
                          key={skill.id}
                          color="primary"
                          variant="flat"
                          size="sm"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-default-400 italic text-sm">
                      No skills added yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Two Columns */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Contact & Links */}
            <div className="md:w-1/2">
              <h3 className="text-sm font-semibold text-default-700 mb-3">Contact & Links</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-primary-600" />
                  <span>{user.email}</span>
                </div>
                {user.websiteUrl && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaGlobe className="text-primary-600" />
                    <a 
                      href={user.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {user.websiteUrl}
                    </a>
                  </div>
                )}
                {user.resume && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaFileAlt className="text-primary-600" />
                    <a 
                      href={user.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}
                {!user.websiteUrl && !user.resume && (
                  <p className="text-default-400 italic text-sm">
                    Add your website and resume links...
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Social Links */}
            <div className="md:w-1/2">
              <h3 className="text-sm font-semibold text-default-700 mb-3">Social Links</h3>
              {user.socialLinks && user.socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      {getSocialIcon(social.platform)}
                      <span className="font-medium capitalize">{social.platform}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-default-400 italic text-sm">
                  Add your social media links...
                </p>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
} 