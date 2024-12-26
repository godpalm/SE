import { useState, useEffect } from "react";
import { Row, Col, Card, Button, message } from "antd";
import {
  GetCodes,
  UpdateCodeAfterCollect,
  AddCodeToCollect,
  GetCollectedCodes,
} from "../../../../services/https";
import { CodeInterface } from "../../../../interfaces/Code";
import dayjs from "dayjs";

function UserCodes() {
  const [codes, setCodes] = useState<CodeInterface[]>([]);
  const [savedCodes, setSavedCodes] = useState<string[]>([]);

  // Fetch all available codes
  const getCodes = async () => {
    try {
      const res = await GetCodes();
      if (res) {
        setCodes(res.data);
      }
    } catch (error) {
      console.error("Error fetching codes: ", error);
    }
  };

  // Fetch collected codes for the user
  interface CollectedCode {
    code_id: number; // Adjust the type as necessary (e.g., string if it's a string).
  }

  const getCollectedCodes = async () => {
    const userId = localStorage.getItem("id") || "1";
    try {
      const res = await GetCollectedCodes(userId);
      if (res && res.data) {
        const collectedCodeIds = res.data.map((collect: CollectedCode) =>
          String(collect.code_id)
        );
        setSavedCodes(collectedCodeIds);
      }
    } catch (error) {
      console.error("Error fetching collected codes: ", error);
    }
  };
  

  // Handle saving a code
  const handleSaveCode = async (codeId: string) => {
    if (savedCodes.includes(codeId)) {
      message.warning("คุณได้เก็บโค้ดนี้ไปแล้ว");
      return;
    }
  
    try {
      // Call backend to decrease code quantity
      await UpdateCodeAfterCollect(codeId);
  
      const userId = localStorage.getItem("id") || "1";
  
      // Add code to user's collected codes
      const res = await AddCodeToCollect(userId, codeId);
  
      if (res.status === 200) {
        setSavedCodes([...savedCodes, codeId]);
        message.success("เก็บโค้ดสำเร็จ!");
      } else if (res.status === 409) {
        message.warning("โค้ดนี้ถูกเก็บไปแล้ว");
      }
    } catch (error) {
      console.error("Error saving code: ", error);
      message.error("เกิดข้อผิดพลาดในการเก็บโค้ด");
    }
  };
  
  useEffect(() => {
    getCodes();
    getCollectedCodes();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f9f9f9", minHeight: "100vh" }}>
      <div>
        <h2 style={{ marginBottom: "20px" }}>โค้ดส่วนลดสำหรับคุณ</h2>
      </div>

      <Row gutter={[16, 16]}>
        {codes.map((code) => (
          <Col key={code.ID} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={
                <img
                  alt={code.code_topic}
                  src={code.code_picture || "https://via.placeholder.com/300"}
                  style={{
                    height: "150px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              }
              title={code.code_topic}
              bordered={false}
              style={{
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>
                <strong>คำอธิบาย:</strong> {code.code_description}
              </p>
              <p>
                <strong>สิ้นสุด:</strong>{" "}
                {dayjs(code.date_end).format("DD/MM/YYYY")}
              </p>
              <Button
                type="primary"
                block
                onClick={() => handleSaveCode(String(code.ID))}
                disabled={savedCodes.includes(String(code.ID))}
              >
                {savedCodes.includes(String(code.ID)) ? "เก็บโค้ดแล้ว" : "เก็บโค้ด"}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserCodes;
