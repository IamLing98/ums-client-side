import React from "react";
import { Table, Tag, Modal } from "antd";

const Result = (props) => {
  function info(record) {
    Modal.info({
      title: "Chi tiết học phần",
      content: (
        <div>
          <p>
            Tên học phần:{" "}
            <strong>
              {props.selectedTerm ? record.subjectName : record.subject.subjectName}
            </strong>
          </p>
          <p>
            Số tín chỉ: <strong>{record.eachSubject}</strong>
          </p>
          <p>
            Điểm chuyên cần: <strong>{record.diemChuyenCan}</strong>{" "}
          </p>
          <p>
            Điểm bài tập: <strong>{record.diemBaiTap}</strong>{" "}
          </p>
          <p>
            Điểm kiểm tra: <strong>{record.diemKiemTra}</strong>{" "}
          </p>
          <p>
            Điểm thi: <strong>{record.diemThi}</strong>{" "}
          </p>
          <p>
            Điểm thi lần 2: <strong>{record.diemThiLai}</strong>{" "}
          </p>
        </div>
      ),
      centered: true,
      okText: "Đóng",
      onOk() {},
    });
  }
  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => {
        if (props.selectedTerm) {
          return (
            <Tag
              className={props.selectedTerm ? "tag_in_table" : ""}
              style={{lineHeight:"32px", fontSize:"16px"}}
              onClick={() => {
                console.log(record);
                if (props.selectedTerm) {
                  info(record);
                }
              }}
            >
              {text}
            </Tag>
          );
        } else return <span> {text}</span>;
      },
    },
    {
      title: "Số tín chỉ",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Điểm hệ 10",
      dataIndex: "diemTrungBinh",
      align: "center",
    },
    {
      title: "Điểm hệ 4",
      dataIndex: "diemThangBon",
      align: "center",
    },
    {
      title: "Điểm chữ",
      dataIndex: "diemChu",
      align: "center",
    },
  ];

  return (
    <div style={{ marginTop: "15px" }}>
      {props.selectedItem && (
        <Tag style={{ lineHeight: "32px", marginBottom: "15px", maxWidth: "30%" }}>
          GPA:{props.selectedTerm ? props.selectedTerm.gpa : ""}
        </Tag>
      )}
      <Table
        bordered
        rowKey="subjectId"
        size="small"
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={props.data}
      />
    </div>
  );
};

export default Result;
