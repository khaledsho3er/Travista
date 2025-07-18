import React from "react";

const VisaDocumentDialog = ({ documentUrl, onClose }) => {
  return (
    <div className="visa-dialog-backdrop">
      <div className="visa-dialog">
        <h3
          style={{ textAlign: "left", fontWeight: "500", marginBottom: "10px" }}
        >
          Visa Document
        </h3>

        {documentUrl ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <a
              href={`https://api.travistasl.com/${documentUrl.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                textDecoration: "none",
                backgroundColor: "var(--maroon)",
              }}
            >
              View or Download PDF
            </a>
          </div>
        ) : (
          <p>No document available for this visa type.</p>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VisaDocumentDialog;
