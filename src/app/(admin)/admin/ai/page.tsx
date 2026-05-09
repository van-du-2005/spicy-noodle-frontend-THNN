// src/app/(admin)/admin/ai/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Loader2, RotateCw, Save } from "lucide-react";
import { aiAdminService } from "@/services/ai-admin.service";
import { useToast } from "@/hooks/useToast";

export default function AIConfigPage() {
  // ===== STATE MANAGEMENT =====
  const [systemPrompt, setSystemPrompt] = useState("");
  const [promptOriginal, setPromptOriginal] = useState("");
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [isRebuilding, setIsRebuilding] = useState(false);
  const { showToast } = useToast();

  // ===== LOAD INITIAL PROMPT =====
  useEffect(() => {
    loadSystemPrompt();
  }, []);

  const loadSystemPrompt = async () => {
    try {
      setIsLoadingPrompt(true);
      const response = await aiAdminService.getSystemPrompt();
      const prompt = response.data?.prompt || "";
      setSystemPrompt(prompt);
      setPromptOriginal(prompt);
    } catch (error: any) {
      const message =
        error?.message || "Không thể tải system prompt";
      showToast(message, "error");
      console.error("Error loading system prompt:", error);
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  // ===== HANDLERS =====
  const handleSavePrompt = async () => {
    if (!systemPrompt.trim()) {
      showToast("System prompt không được để trống", "error");
      return;
    }

    if (systemPrompt === promptOriginal) {
      showToast("Không có thay đổi nào để lưu", "info");
      return;
    }

    try {
      setIsSavingPrompt(true);
      await aiAdminService.updateSystemPrompt(systemPrompt);
      setPromptOriginal(systemPrompt);
      showToast("Lưu system prompt thành công", "success");
    } catch (error: any) {
      const message =
        error?.message || "Lỗi khi lưu system prompt";
      showToast(message, "error");
      console.error("Error saving system prompt:", error);
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleRebuildVectorDB = async () => {
    const confirmed = window.confirm(
      "Bạn chắc chắn muốn rebuild vector database? Quá trình này có thể mất vài phút."
    );

    if (!confirmed) return;

    try {
      setIsRebuilding(true);
      await aiAdminService.rebuildVectorDB();
      showToast("Rebuild vector database thành công", "success");
    } catch (error: any) {
      const message =
        error?.message || "Lỗi khi rebuild vector database";
      showToast(message, "error");
      console.error("Error rebuilding vector database:", error);
    } finally {
      setIsRebuilding(false);
    }
  };

  const isPromptModified = systemPrompt !== promptOriginal;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-10">
      {/* ===== SECTION 1: REBUILD VECTOR DATABASE ===== */}
      <section className="space-y-4 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Rebuild Vector Database
          </h2>
          <p className="text-gray-400">
            Tái xây dựng cơ sở dữ liệu vector để cập nhật tất cả các tài liệu
            và cải thiện hiệu suất tìm kiếm của chatbot AI.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-300">
              Quá trình này có thể mất vài phút để hoàn thành.
            </p>
            <p className="text-xs text-gray-500">
              Hệ thống sẽ tự động xử lý mà không ảnh hưởng đến chatbot đang hoạt động.
            </p>
          </div>
          <button
            onClick={handleRebuildVectorDB}
            disabled={isRebuilding}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isRebuilding
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
            }`}
          >
            {isRebuilding ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <RotateCw className="w-5 h-5" />
                Rebuild Vector Database
              </>
            )}
          </button>
        </div>
      </section>

      {/* ===== SECTION 2: SYSTEM PROMPT ===== */}
      <section className="space-y-4 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Cấu hình System Prompt
          </h2>
          <p className="text-gray-400">
            Chỉnh sửa prompt hệ thống để tùy chỉnh hành vi và phong cách trả lời
            của chatbot AI.
          </p>
        </div>

        {isLoadingPrompt ? (
          <div className="flex items-center justify-center py-12">
            <div className="space-y-3 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
              <p className="text-gray-400">Đang tải system prompt...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Textarea */}
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Nhập system prompt tại đây..."
              className={`w-full h-64 p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                isPromptModified
                  ? "border-blue-500 focus:ring-blue-500"
                  : "border-gray-700 focus:ring-gray-600"
              }`}
            />

            {/* Character count & status */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-400">
                {systemPrompt.length} ký tự
              </div>
              {isPromptModified && (
                <div className="text-blue-400 font-medium">
                  • Có thay đổi chưa lưu
                </div>
              )}
            </div>

            {/* Save button */}
            <button
              onClick={handleSavePrompt}
              disabled={isSavingPrompt || !isPromptModified}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isSavingPrompt || !isPromptModified
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white active:scale-95"
              }`}
            >
              {isSavingPrompt ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu Prompt
                </>
              )}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
