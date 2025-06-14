import React, { useState, useEffect } from "react";
import { Select, SelectItem, Alert, Input } from "@heroui/react";
import { CollegeInfo } from "@/store/onboardingStore";
import { CollegeService, College } from "@/lib/api/colleges";
import { useRouter } from "next/navigation";

const StepThree: React.FC = () => {
  const router = useRouter();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<CollegeInfo>({
    collegeId: "",
    collegeEmail: "",
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const { data } = await CollegeService.getAllColleges();
      setColleges(data);
    } catch (err) {
      setError("Failed to load colleges. Please try again later.");
      console.error("Error fetching colleges:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, collegeId: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, collegeEmail: e.target.value }));
  };

  const renderSelectItems = () => {
    const items = colleges.map((college) => (
      <SelectItem key={college.id} textValue={college.name}>
        {college.name}
      </SelectItem>
    ));

    items.push(
      <SelectItem
        key="request-college"
        textValue="Request to add your college"
        classNames={{
          base: "text-gray-500 bg-gray-100 text-center",
        }}
        onPress={() => {
          router.push("https://forms.google.com/your-form-link");
        }}
      >
        Request to add your college
      </SelectItem>,
    );

    return items;
  };

  const selectedCollege = colleges.find((c) => c.id === formData.collegeId);
  const allowedDomains = selectedCollege?.domains || [];

  const isValid = allowedDomains.some((domain) =>
    formData.collegeEmail.endsWith(domain),
  );

  return (
    <div className="max-w-xl m-auto p-6 space-y-4">
      {error && <Alert color="danger" description={error} />}

      <Select
        label="College"
        placeholder="Select your college"
        onSelectionChange={(keys) => {
          console.log(keys);
          handleCollegeSelect(Array.from(keys)[0] as string);
        }}
        isLoading={loading}
        className="w-full"
        variant="bordered"
        size="sm"
      >
        {renderSelectItems()}
      </Select>

      <Input
        label="College Email"
        value={formData.collegeEmail}
        onChange={handleEmailChange}
        placeholder={`Allowed domains: ${allowedDomains.join(", ")}`}
        variant="bordered"
        className="w-full"
        isInvalid={!isValid && formData.collegeEmail !== ""}
        errorMessage={`Allowed domains: ${allowedDomains.join(", ")}`}
        size="sm"
      />
    </div>
  );
};

export default StepThree;
