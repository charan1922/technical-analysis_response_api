import { Input, Modal, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../shared/constants";

interface IAnalysisModal {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: string) => void;
}

const AnalysisModal = ({
  isModalVisible,
  setIsModalVisible,
  onSubmit,
}: IAnalysisModal) => {
  const [analysisName, setAnalysisName] = useState("");

  const handleCancel = () => {
    setIsModalVisible(false);
    setAnalysisName("");
  };

  const createNewSession = async (analysisName: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/session/new`, {
        analysis_name: analysisName,
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleSave = async () => {
    try {
      await createNewSession(analysisName);
      setIsModalVisible(false);
      setAnalysisName("");
      message.success("Session created successfully");
      onSubmit(analysisName);
    } catch (error: any) {
      console.error("Error creating session:", error);
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Create New Analysis" // Updated title for better clarity
      okText="Save"
      open={isModalVisible}
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter analysis name"
        value={analysisName}
        onPressEnter={handleSave}
        onChange={(e) => setAnalysisName(e.target.value)}
        aria-label="Analysis Name" // Added for accessibility
      />
    </Modal>
  );
};

export default AnalysisModal;
