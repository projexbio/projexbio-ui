import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Alert,
  Input,
  InputOtp,
  Button,
  Spinner,
  Chip,
  DatePicker,
} from "@heroui/react";
import { useOnboardingStore } from "@/store/onboardingStore";
import { CollegeService, College } from "@/lib/api/colleges";
import {
  EmailVerificationService,
  OTPContext,
} from "@/lib/api/emailVerification";
import { useRouter } from "next/navigation";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { programOptions } from "@/constants/programOptions";
import { branchOptions } from "@/constants/branchOptions";
import { parseDate } from "@internationalized/date";

const CollegeInfo: React.FC = () => {
  const router = useRouter();
  const { onboardingData, setOnboardingData } = useOnboardingStore();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [firstOtpSent, setFirstOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const uniqueProgramOptions = Array.from(new Set(programOptions)).map(
    (option) => ({
      key: option,
      label: option,
    }),
  );
  const uniqueBranchOptions = Array.from(new Set(branchOptions)).map(
    (option) => ({
      key: option,
      label: option,
    }),
  );

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);
  const fetchColleges = async () => {
    try {
      const { data } = await CollegeService.getAllColleges();
      setColleges(data);
    } catch (err) {
      setError(
        "Failed to load colleges. Please try again later." +
          (err instanceof Error ? err.message : "Unknown error"),
      );
      console.error("Error fetching colleges:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeSelect = (value: string) => {
    if (value === "request-college") {
      // TODO: Add correct form link
      router.push("https://forms.google.com/your-form-link");
      return;
    }
    setOnboardingData({ collegeId: value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnboardingData({ collegeEmail: e.target.value });
    setIsEmailVerified(false);
    setFirstOtpSent(false);
    setOtp("");
  };

  const handleOtpChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setOtp(target.value);
  };

  const handleSendOtp = async () => {
    if (!onboardingData.collegeEmail) return;

    setIsSendingOtp(true);
    try {
      await EmailVerificationService.sendOtp(
        onboardingData.collegeEmail,
        OTPContext.VERIFY_EMAIL,
      );
      setFirstOtpSent(true);
      setError("");
    } catch (err) {
      setError(
        "Failed to send OTP. Please try again." +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !onboardingData.collegeEmail || otp.length !== 6) return;

    setIsVerifyingOtp(true);
    setError("");
    try {
      await EmailVerificationService.verifyOtp(
        onboardingData.collegeEmail,
        otp,
      );
      setIsEmailVerified(true);
      setFirstOtpSent(false);
      setError("");
    } catch (err) {
      setError(
        "Invalid OTP. Please try again." +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const selectedCollege = colleges.find(
    (c) => c.id === onboardingData.collegeId,
  );
  const allowedDomains = selectedCollege?.domains || [];
  const isValid = allowedDomains.some((domain) =>
    onboardingData.collegeEmail.endsWith(domain),
  );

  // --- New fields for student/faculty ---
  const isStudent = onboardingData.role === "STUDENT";

  return (
    <div className="max-w-xl m-auto p-6 space-y-4">
      <Chip color="primary" size="sm">
        College Information
      </Chip>
      {error && <Alert color="danger" description={error} />}

      <Autocomplete
        label="College"
        placeholder="Search your college"
        onSelectionChange={(key) => handleCollegeSelect(key as string)}
        isLoading={loading}
        className="w-full"
        variant="bordered"
        size="sm"
        isRequired
      >
        <>
          {colleges.map((college) => (
            <AutocompleteItem key={college.id} textValue={college.name}>
              {college.name}
            </AutocompleteItem>
          ))}
          <AutocompleteItem
            key="request-college"
            textValue="Request to add your college"
            classNames={{
              base: "text-gray-500 bg-gray-100 text-center",
            }}
          >
            Request to add your college
          </AutocompleteItem>
        </>
      </Autocomplete>

      <Input
        isRequired
        label="College Email"
        value={onboardingData.collegeEmail}
        onChange={handleEmailChange}
        placeholder={`Allowed domains: ${allowedDomains.join(", ")}`}
        variant="bordered"
        className="w-full"
        isInvalid={!isValid && onboardingData.collegeEmail !== ""}
        errorMessage={`Allowed domains: ${allowedDomains.join(", ")}`}
        size="sm"
        endContent={
          onboardingData.collegeEmail &&
          (isVerifyingOtp ? (
            <Spinner color="current" />
          ) : (
            <div className="flex items-center gap-1 w-32 m-auto">
              {isEmailVerified ? (
                <>
                  <MdVerified className="text-green-500" />
                  <span className="text-sm text-green-500">Verified</span>
                </>
              ) : (
                <>
                  <GoUnverified className="text-red-400" />
                  <span className="text-sm text-red-400">Not Verified</span>
                </>
              )}
            </div>
          ))
        }
      />

      {/* OTP Verification */}
      {isValid && onboardingData.collegeEmail && !isEmailVerified && (
        <div className="flex items-center gap-4">
          <Button
            onPress={handleSendOtp}
            disabled={isSendingOtp}
            className="text-primary hover:text-primary-600 text-sm font-medium"
            variant="light"
          >
            {isSendingOtp
              ? "Sending..."
              : firstOtpSent
                ? "Resend OTP"
                : "Send OTP"}
          </Button>
          <InputOtp
            value={otp}
            onChange={handleOtpChange}
            length={6}
            className=""
            size="sm"
          />
        </div>
      )}

      {/* Student fields */}
      {isStudent ? (
        <div className="space-y-4">
          <Autocomplete
            label="Current Program"
            placeholder="Select or type your program"
            allowsCustomValue
            className="w-full"
            variant="bordered"
            size="sm"
            defaultItems={uniqueProgramOptions}
            inputValue={onboardingData.program || ""}
            onInputChange={(value) => setOnboardingData({ program: value })}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.key} textValue={item.label}>
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Branch"
            placeholder="Select or type your branch"
            allowsCustomValue
            className="w-full"
            variant="bordered"
            size="sm"
            defaultItems={uniqueBranchOptions}
            inputValue={onboardingData.branch || ""}
            onInputChange={(value) => setOnboardingData({ branch: value })}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.key} textValue={item.label}>
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <div className="flex gap-4 w-full">
            <DatePicker
              label="Start Date"
              className="w-1/2"
              value={
                onboardingData.startDate
                  ? parseDate(onboardingData.startDate)
                  : null
              }
              onChange={(dateValue) =>
                setOnboardingData({
                  startDate: dateValue ? dateValue.toString() : undefined,
                })
              }
              isRequired
              variant="bordered"
              showMonthAndYearPickers
            />
            <DatePicker
              label="End Date"
              className="w-1/2"
              granularity="day"
              value={
                onboardingData.endDate
                  ? parseDate(onboardingData.endDate)
                  : null
              }
              onChange={(dateValue) =>
                setOnboardingData({
                  endDate: dateValue ? dateValue.toString() : undefined,
                })
              }
              isRequired
              variant="bordered"
              showMonthAndYearPickers
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            label="Designation"
            placeholder="Enter your designation"
            className="w-full"
            variant="bordered"
            size="sm"
            value={onboardingData.designation || ""}
            onChange={(e) => setOnboardingData({ designation: e.target.value })}
            isRequired
          />
        </div>
      )}
    </div>
  );
};

export default CollegeInfo;
