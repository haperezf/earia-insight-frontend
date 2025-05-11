
import React, { useState } from "react";
import AnalysisForm from "@/components/AnalysisForm";
import AnalysisResults from "@/components/AnalysisResults";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "sonner";

interface FormData {
  query: string;
  aspect_to_analyze: string;
  analysis_type: string;
  k_retrieval: number;
  force_reprocess_entire_directory: boolean;
}

interface AnalysisResponse {
  original_query?: string;
  earia_result?: string;
  interpreter_result?: string;
  execution_log?: string[];
  error_message?: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState<{
    originalQuery: string;
    agent1Result: string;
    agent2Result: string;
    executionLog: string;
    errorMessage: string;
  }>({
    originalQuery: "",
    agent1Result: "",
    agent2Result: "",
    executionLog: "",
    errorMessage: "",
  });

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorDetail = `Error del servidor: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorDetail;
        } catch (e) {
          // If error body is not JSON, use text
          const errorText = await response.text();
          errorDetail = errorText || errorDetail;
        }
        
        throw new Error(errorDetail);
      }

      const data: AnalysisResponse = await response.json();
      
      setResultData({
        originalQuery: data.original_query || "N/D",
        agent1Result: data.earia_result || "No se recibió resultado del Agente 1 o hubo un error previo.",
        agent2Result: data.interpreter_result || "No se recibió resultado del Agente 2 o hubo un error previo.",
        executionLog: data.execution_log ? data.execution_log.join("\n- ") : "Log de ejecución no disponible.",
        errorMessage: data.error_message || "",
      });
      
      setShowResults(true);
      
      if (data.error_message) {
        toast.warning("El análisis se completó con advertencias");
      } else {
        toast.success("Análisis completado con éxito");
      }
      
    } catch (error) {
      console.error("Error:", error);
      setResultData({
        originalQuery: "",
        agent1Result: "",
        agent2Result: "",
        executionLog: "",
        errorMessage: `Error en la petición al backend: ${(error as Error).message}`,
      });
      
      setShowResults(true);
      toast.error("Error al comunicarse con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Interfaz del Agente EARIA
          </h1>
          <p className="text-slate-600">
            Sistema de análisis avanzado para documentos de telecomunicaciones
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <AnalysisForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {isLoading && <LoadingSpinner />}

        {showResults && (
          <div className="mt-8 animate-fade-in">
            <AnalysisResults
              originalQuery={resultData.originalQuery}
              agent1Result={resultData.agent1Result}
              agent2Result={resultData.agent2Result}
              executionLog={resultData.executionLog}
              errorMessage={resultData.errorMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
