
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Database, FileText, Flag, Terminal } from "lucide-react";

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
  icon: React.ReactNode;
  maxHeight?: string;
  delay?: number;
}> = ({ title, content, icon, maxHeight = "300px", delay = 0 }) => (
  <div className={`space-y-2 result-section`} style={{ animationDelay: `${delay}s` }}>
    <h4 className="font-medium text-lg text-blue-600 flex items-center gap-2">
      {icon}
      {title}
    </h4>
    <ScrollArea 
      className={`border rounded-md bg-gradient-to-br from-slate-50 to-white p-4 max-h-[${maxHeight}] shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
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
    <Card className="bg-white border-none shadow-lg overflow-hidden card-hover">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resultados del Análisis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <ResultSection 
          title="Consulta Original Enviada:" 
          content={originalQuery} 
          maxHeight="150px" 
          icon={<Flag className="h-5 w-5 text-blue-600" />}
          delay={0.1}
        />
        
        <ResultSection 
          title="Respuesta del Agente 1 (EARIA - Análisis Principal):" 
          content={agent1Result} 
          icon={<BookOpen className="h-5 w-5 text-blue-600" />}
          delay={0.2}
        />
        
        <ResultSection 
          title="Respuesta del Agente 2 (Intérprete - Meta-Análisis Profundo):" 
          content={agent2Result} 
          icon={<Database className="h-5 w-5 text-blue-600" />}
          delay={0.3}
        />
        
        <ResultSection 
          title="Log de Ejecución (del backend):" 
          content={executionLog} 
          icon={<Terminal className="h-5 w-5 text-blue-600" />}
          delay={0.4}
        />

        {errorMessage && (
          <Alert variant="destructive" className="mt-4 border-red-300 bg-red-50">
            <AlertDescription className="font-medium">{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
