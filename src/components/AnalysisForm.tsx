
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpenText, Brain, Database, Zap } from "lucide-react";

interface AnalysisFormProps {
  onSubmit: (formData: {
    query: string;
    aspect_to_analyze: string;
    analysis_type: string;
    k_retrieval: number;
    force_reprocess_entire_directory: boolean;
  }) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [formValues, setFormValues] = React.useState({
    query: "Analizar exhaustivamente y con profundidad los objetivos principales del documento (o documentos) disponibles, sus costos asociados (si se mencionan), y sus impactos económicos directos e indirectos tanto para los operadores (pequeños y grandes) como para los consumidores finales, en el contexto de las telecomunicaciones en Colombia.",
    aspect_to_analyze: "objetivos, costos e impactos económicos generales de los documentos disponibles",
    analysis_type: "cot_analysis",
    k_retrieval: 8,
    force_reprocess_entire_directory: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formValues,
      k_retrieval: Number(formValues.k_retrieval),
    });
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="query" className="text-base font-semibold flex items-center gap-2 text-blue-600">
            <Brain size={18} /> Consulta Principal
          </Label>
          <Textarea
            id="query"
            value={formValues.query}
            onChange={(e) => handleChange("query", e.target.value)}
            className="mt-2 min-h-[120px] bg-white border-blue-200 focus:border-blue-400 shadow-sm"
            placeholder="Ingrese su consulta para el análisis..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="analysis_type" className="text-base font-semibold flex items-center gap-2 text-blue-600">
              <Zap size={18} /> Tipo de Análisis para Agente 1
            </Label>
            <Select
              value={formValues.analysis_type}
              onValueChange={(value) => handleChange("analysis_type", value)}
            >
              <SelectTrigger className="bg-white border-blue-200 focus:border-blue-400 shadow-sm">
                <SelectValue placeholder="Seleccione tipo de análisis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cot_analysis">Análisis CoT Profundo</SelectItem>
                <SelectItem value="basic_rag">RAG Básico</SelectItem>
                <SelectItem value="tot_exploration">Exploración ToT</SelectItem>
                <SelectItem value="ain_extraction">Extracción AIN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspect_to_analyze" className="text-base font-semibold flex items-center gap-2 text-blue-600">
              <BookOpenText size={18} /> Aspecto/Tema Principal a Analizar
            </Label>
            <Input
              id="aspect_to_analyze"
              value={formValues.aspect_to_analyze}
              onChange={(e) => handleChange("aspect_to_analyze", e.target.value)}
              className="bg-white border-blue-200 focus:border-blue-400 shadow-sm"
              placeholder="Aspecto específico para analizar..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="k_retrieval" className="text-base font-semibold flex items-center gap-2 text-blue-600">
              <Database size={18} /> Chunks a Recuperar (k)
            </Label>
            <Input
              id="k_retrieval"
              type="number"
              min={1}
              value={formValues.k_retrieval}
              onChange={(e) => handleChange("k_retrieval", parseInt(e.target.value))}
              className="bg-white border-blue-200 focus:border-blue-400 shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-2 h-full pt-8">
            <Checkbox
              id="force_reprocess_all"
              checked={formValues.force_reprocess_entire_directory}
              onCheckedChange={(checked) => handleChange("force_reprocess_entire_directory", !!checked)}
              className="border-blue-400 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="force_reprocess_all" className="text-sm font-medium">
              Forzar Re-indexación Completa del Directorio de Documentos
            </Label>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6 font-medium text-base shadow-lg transition-all hover:shadow-xl"
      >
        {isLoading ? "Procesando..." : "Enviar Análisis"}
      </Button>
    </form>
  );
};

export default AnalysisForm;
