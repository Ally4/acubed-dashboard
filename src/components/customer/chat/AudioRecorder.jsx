import { useState, useEffect, useRef } from "react";

const MAX_DURATION = 60; // seconds

const AudioRecorder = ({ onConfirm, onCancel }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    // On mount — request mic and start recording
    useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        recorder.start();
    });

    return () => {
        // Stop all mic tracks on unmount
        mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
    };
    }, []);

    const handleConfirm = () => {
        mediaRecorderRef.current.stop();

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            onConfirm({ duration: elapsed, blob });
        };
    };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= MAX_DURATION) {
            clearInterval(intervalRef.current);
            return MAX_DURATION;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const progress = Math.min(elapsed / MAX_DURATION, 1);
  const isNearLimit = elapsed >= MAX_DURATION * 0.8;
  const isAtLimit = elapsed >= MAX_DURATION;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Arc path for circular progress
  const R = 22;
  const cx = 28;
  const cy = 28;
  const circumference = 2 * Math.PI * R;
  const strokeDash = circumference * progress;

  const trackColor = isAtLimit
    ? "#ef4444"
    : isNearLimit
    ? "#f97316"
    : "#1C7D7F";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 14px",
        background: "rgba(255,255,255,0.04)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
      }}
    >
      {/* Circular progress + timer */}
      <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
        <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          {/* Progress arc */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke={trackColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: "stroke-dasharray 0.1s linear, stroke 0.3s ease" }}
          />
        </svg>

        {/* Pulsing mic dot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isAtLimit && !isPaused ? (
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: trackColor,
                animation: "pulse 1.2s ease-in-out infinite",
              }}
            />
          ) : (
            <span style={{ fontSize: 14 }}>
              {isPaused ? "⏸" : "⏹"}
            </span>
          )}
        </div>
      </div>

      {/* Timer + label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: isAtLimit ? "#ef4444" : "rgba(255,255,255,0.9)",
            lineHeight: 1,
            transition: "color 0.3s ease",
          }}
        >
          {formatTime(elapsed)}
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              marginLeft: 6,
              fontWeight: 400,
            }}
          >
            / {formatTime(MAX_DURATION)}
          </span>
        </div>
        <div
          style={{
            marginTop: 5,
            height: 3,
            borderRadius: 99,
            background: "rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              borderRadius: 99,
              background: trackColor,
              transition: "width 0.1s linear, background 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 10,
            color: isAtLimit
              ? "#ef4444"
              : isNearLimit
              ? "#f97316"
              : "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
        >
          {isAtLimit
            ? "Limit reached"
            : isNearLimit
            ? "Almost at limit"
            : isPaused
            ? "Paused"
            : "Recording..."}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {/* Cancel */}
        <button
          onClick={() => {
            mediaRecorderRef.current.stop();
            onCancel()
          }}
          title="Cancel"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.15)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          ✕
        </button>

        {/* Confirm / Send */}
        <button
          onClick={() => handleConfirm()}
          disabled={elapsed < 0.5}
          title="Send recording"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "none",
            background: elapsed >= 0.5 ? "#1C7D7F" : "rgba(255,255,255,0.05)",
            color: elapsed >= 0.5 ? "#fff" : "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: elapsed >= 0.5 ? "pointer" : "not-allowed",
            fontSize: 16,
            transition: "all 0.15s ease",
            boxShadow: elapsed >= 0.5 ? "0 0 12px rgba(28,125,127,0.4)" : "none",
          }}
          onMouseEnter={(e) => {
            if (elapsed >= 0.5) {
              e.currentTarget.style.background = "#15696b";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(28,125,127,0.6)";
            }
          }}
          onMouseLeave={(e) => {
            if (elapsed >= 0.5) {
              e.currentTarget.style.background = "#1C7D7F";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(28,125,127,0.4)";
            }
          }}
        >
          ↑
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;