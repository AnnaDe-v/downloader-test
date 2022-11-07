import React, { useState } from "react";
import styles from "./Downloader.module.css";

export default function Downloader() {
  const [urlValue, setURLValue] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [stateFile, setStateFile] = useState(null);

  const fetchURL = async () => {
    setIsLoading(true);
    try {
      if (urlValue == '') {
        setRequestStatus("error");
      } else {
        const result = await fetch(urlValue);
        setStateFile(result);
        setRequestStatus("success");
      }
    } catch (error) {
      setRequestStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadHandler = async (stateFile) => {
    const blob = await stateFile.blob();
    const tempUrl = window.URL.createObjectURL(blob);
    const aTag = document.createElement("a");
    aTag.href = tempUrl;
    aTag.download = tempUrl.replace(/^.*[\\\/]/, "");
    aTag.click();
    aTag.remove();
    setRequestStatus("idle");
    setURLValue("");
  };

  const cancelerHandler = () => {
    setURLValue("");
    setRequestStatus("idle");
  };

  return (
    <>
      <div className={styles["download-form__wrapper"]}>
        <h1 className={styles["download-form__header"]}>Downloader</h1>
        <input
          className={styles["download-form__input"]}
          name="url"
          type="text"
          value={urlValue}
          onChange={(e) => {
            setURLValue(e.target.value);
          }}
        />
        <button
          className={styles["download-form__button"]}
          onClick={() => fetchURL(urlValue)}
          disabled={isLoading}
        >
          Search
        </button>
        {isLoading && <div>Loading...</div>}
        {requestStatus == "error" && (
          <div style={{ color: "red" }}>Required file not found or link is not avalible</div>
        )}
        {requestStatus == "success" && (
          <div>
            <div>File for downloading is finded</div>
            <div className={styles["download-form__button-wrapper"]}>
              <button
                className={styles["download-form__button-approve"]}
                onClick={() => downloadHandler(stateFile)}
              >
                download
              </button>
              <button
                className={styles["download-form__button-reject"]}
                onClick={() => cancelerHandler()}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
