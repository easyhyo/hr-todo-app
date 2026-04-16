import { useEffect, useMemo, useState } from "react";

const categoryOptions = ["업무", "개인", "채용", "미팅", "기타"];

const priorityOptions = {
  high: {
    label: "높음",
    textColor: "#b91c1c",
    bgColor: "#fee2e2",
    borderColor: "#fecaca",
  },
  medium: {
    label: "중간",
    textColor: "#b45309",
    bgColor: "#ffedd5",
    borderColor: "#fed7aa",
  },
  low: {
    label: "낮음",
    textColor: "#047857",
    bgColor: "#d1fae5",
    borderColor: "#a7f3d0",
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "32px 20px",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  container: {
    maxWidth: 920,
    margin: "0 auto",
  },
  card: {
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
    overflow: "hidden",
    backdropFilter: "blur(8px)",
  },
  hero: {
    padding: "28px 28px 20px 28px",
    borderBottom: "1px solid #eef2f7",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
  },
  title: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    margin: "8px 0 0 0",
    color: "#64748b",
    fontSize: 14,
  },
  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: "14px 16px",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  body: {
    padding: 28,
  },
  inputGrid: {
    display: "grid",
    gridTemplateColumns: "2.1fr 1.2fr 1fr 1fr auto",
    gap: 12,
    alignItems: "end",
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
  },
  field: {
    width: "100%",
    height: 44,
    borderRadius: 14,
    border: "1px solid #dbe3ee",
    background: "#ffffff",
    padding: "0 14px",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
  },
  addButton: {
    height: 44,
    border: "none",
    borderRadius: 14,
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    color: "white",
    fontWeight: 700,
    padding: "0 18px",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.22)",
  },
  filterRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 22,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  empty: {
    border: "1px dashed #cbd5e1",
    background: "#f8fafc",
    color: "#94a3b8",
    borderRadius: 18,
    padding: "28px 16px",
    textAlign: "center",
    fontSize: 14,
  },
};

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Page() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("hr-todo-tasks");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error("Failed to parse saved tasks", error);
        }
      }
    }

    return [
      {
        id: 1,
        text: "면접 피드백 취합",
        done: false,
        deadline: "2026-04-18",
        priority: "high",
        category: "채용",
        createdAt: 1,
      },
      {
        id: 2,
        text: "온보딩 체크리스트 정리",
        done: false,
        deadline: "2026-04-20",
        priority: "medium",
        category: "업무",
        createdAt: 2,
      },
      {
        id: 3,
        text: "주간 1on1 일정 확정",
        done: true,
        deadline: "2026-04-16",
        priority: "low",
        category: "미팅",
        createdAt: 3,
      },
    ];
  });
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("업무");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("hr-todo-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const counts = useMemo(() => {
    const active = tasks.filter((t) => !t.done).length;
    const completed = tasks.filter((t) => t.done).length;
    return {
      all: tasks.length,
      active,
      completed,
    };
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        done: false,
        deadline,
        priority,
        category,
        createdAt: Date.now(),
      },
    ]);

    setInput("");
    setDeadline("");
    setPriority("medium");
    setCategory("업무");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const sortedTasks = useMemo(() => {
    let filtered = tasks;

    if (filter === "active") filtered = tasks.filter((task) => !task.done);
    if (filter === "completed") filtered = tasks.filter((task) => task.done);

    const priorityRank = { high: 0, medium: 1, low: 2 };

    return [...filtered].sort((a, b) => {
      if (a.done !== b.done) return a.done - b.done;

      if (a.deadline && b.deadline) {
        const deadlineCompare = new Date(a.deadline) - new Date(b.deadline);
        if (deadlineCompare !== 0) return deadlineCompare;
      }

      if (a.deadline && !b.deadline) return -1;
      if (!a.deadline && b.deadline) return 1;

      const priorityCompare = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityCompare !== 0) return priorityCompare;

      return a.createdAt - b.createdAt;
    });
  }, [tasks, filter]);

  const today = getTodayString();

  const getFilterButtonStyle = (value) => ({
    border: filter === value ? "1px solid #bfdbfe" : "1px solid #dbe3ee",
    background: filter === value ? "#eff6ff" : "#ffffff",
    color: filter === value ? "#1d4ed8" : "#334155",
    borderRadius: 999,
    height: 40,
    padding: "0 14px",
    fontWeight: 700,
    cursor: "pointer",
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.hero}>
            <h1 style={styles.title}>HR To Do List</h1>
            <p style={styles.subtitle}>
              채용, 미팅, 운영 업무를 우선순위와 마감일 기준으로 관리하세요.
            </p>

            <div style={styles.statRow}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>전체</div>
                <div style={styles.statValue}>{counts.all}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>진행중</div>
                <div style={styles.statValue}>{counts.active}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>완료됨</div>
                <div style={styles.statValue}>{counts.completed}</div>
              </div>
            </div>
          </div>

          <div style={styles.body}>
            <div style={styles.inputGrid}>
              <div>
                <label style={styles.label}>할 일</label>
                <input
                  style={styles.field}
                  placeholder="예: 후보자 레퍼런스 체크 요청"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
              </div>

              <div>
                <label style={styles.label}>마감일</label>
                <input
                  style={styles.field}
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div>
                <label style={styles.label}>우선순위</label>
                <select
                  style={styles.field}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">높음</option>
                  <option value="medium">중간</option>
                  <option value="low">낮음</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>카테고리</label>
                <select
                  style={styles.field}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={styles.label}>&nbsp;</label>
                <button style={styles.addButton} onClick={addTask}>
                  추가
                </button>
              </div>
            </div>

            <div style={styles.filterRow}>
              <button style={getFilterButtonStyle("all")} onClick={() => setFilter("all")}>
                전체 {counts.all}
              </button>
              <button style={getFilterButtonStyle("active")} onClick={() => setFilter("active")}>
                진행중 {counts.active}
              </button>
              <button
                style={getFilterButtonStyle("completed")}
                onClick={() => setFilter("completed")}
              >
                완료됨 {counts.completed}
              </button>
            </div>

            <div style={styles.list}>
              {sortedTasks.length === 0 ? (
                <div style={styles.empty}>표시할 할 일이 없습니다.</div>
              ) : (
                sortedTasks.map((task) => {
                  const priorityStyle = priorityOptions[task.priority];
                  const isOverdue = !task.done && task.deadline && task.deadline < today;

                  return (
                    <div
                      key={task.id}
                      style={{
                        border: isOverdue ? "1px solid #fecaca" : "1px solid #e2e8f0",
                        background: task.done
                          ? "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
                          : "#ffffff",
                        borderRadius: 20,
                        padding: 18,
                        boxShadow: task.done
                          ? "none"
                          : "0 10px 24px rgba(15, 23, 42, 0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 16,
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 260 }}>
                          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <button
                              onClick={() => toggleTask(task.id)}
                              style={{
                                marginTop: 2,
                                width: 24,
                                height: 24,
                                borderRadius: 999,
                                border: task.done
                                  ? "1px solid #334155"
                                  : "1px solid #cbd5e1",
                                background: task.done ? "#334155" : "#ffffff",
                                color: task.done ? "#ffffff" : "transparent",
                                fontSize: 14,
                                cursor: "pointer",
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </button>

                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: 16,
                                  fontWeight: 700,
                                  lineHeight: 1.45,
                                  color: task.done ? "#94a3b8" : "#0f172a",
                                  textDecoration: task.done ? "line-through" : "none",
                                }}
                              >
                                {task.text}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  flexWrap: "wrap",
                                  marginTop: 12,
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "6px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: priorityStyle.textColor,
                                    background: priorityStyle.bgColor,
                                    border: `1px solid ${priorityStyle.borderColor}`,
                                  }}
                                >
                                  {priorityStyle.label}
                                </span>

                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "6px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#475569",
                                    background: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  {task.category}
                                </span>

                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "6px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: isOverdue ? "#b91c1c" : "#475569",
                                    background: isOverdue ? "#fef2f2" : "#f8fafc",
                                    border: isOverdue
                                      ? "1px solid #fecaca"
                                      : "1px solid #e2e8f0",
                                  }}
                                >
                                  {task.deadline || "마감일 없음"}
                                </span>

                                {isOverdue && (
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      padding: "6px 10px",
                                      borderRadius: 999,
                                      fontSize: 12,
                                      fontWeight: 700,
                                      color: "#b91c1c",
                                      background: "#fee2e2",
                                      border: "1px solid #fecaca",
                                    }}
                                  >
                                    지연됨
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => toggleTask(task.id)}
                            style={{
                              height: 38,
                              padding: "0 12px",
                              borderRadius: 12,
                              border: "1px solid #dbe3ee",
                              background: "#ffffff",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            {task.done ? "취소" : "완료"}
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            style={{
                              height: 38,
                              padding: "0 12px",
                              borderRadius: 12,
                              border: "1px solid #fee2e2",
                              background: "#fff1f2",
                              color: "#be123c",
                              cursor: "pointer",
                              fontWeight: 700,
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
