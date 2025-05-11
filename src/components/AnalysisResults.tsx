
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisResultsProps {
  originalQuery: string;
  agent1Result: string;
  agent2Result: string;
  executionLog: string;
  errorMessage: string;
}

const ResultSection: React.FC<{
  title: string;
  content: string;
  maxHeight?: string;
}> = ({ title, content, maxHeight = "300px" }) => (
  <div className="space-y-2">
    <h4 className="font-medium text-lg text-blue-600">{title}</h4>
    <ScrollArea className={`border rounded-md bg-slate-50 p-4 max-h-[${maxHeight}]`}>
      <pre className="whitespace-pre-wrap text-sm font-mono text-slate-800">
        {content || "No hay información disponible."}
      </pre>
    </ScrollArea>
  </div>
);

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  originalQuery,
  agent1Result,
  agent2Result,
  executionLog,
  errorMessage,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-blue-600">Resultados del Análisis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResultSection title="Consulta Original Enviada:" content={originalQuery} maxHeight="150px" />
        <ResultSection title="Respuesta del Agente 1 (EARIA - Análisis Principal):" content={agent1Result} />
        <ResultSection title="Respuesta del Agente 2 (Intérprete - Meta-Análisis Profundo):" content={agent2Result} />
        <ResultSection title="Log de Ejecución (del backend):" content={executionLog} />

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
