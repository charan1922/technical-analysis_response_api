import { Input, Modal } from 'antd'
import { useState } from 'react'


interface IAnalysisModal {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (data: string) => void;
}

const AnalysisModal = ({ isModalVisible, setIsModalVisible, onSubmit }: IAnalysisModal) => {
    const [analysisName, setAnalysisName] = useState('');

    const handleCancel = () => {
        setIsModalVisible(false)
        setAnalysisName('')
    }

    const handleSave = () => {
        onSubmit(analysisName)
        setIsModalVisible(false)
    }

    return (
        <Modal
            title="Title"
            okText="Save"
            open={isModalVisible}
            onOk={handleSave}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Input
                placeholder="Enter analysis name"
                value={analysisName}
                onChange={(e) => setAnalysisName(e.target.value)}
            />
        </Modal>
    )
}

export default AnalysisModal