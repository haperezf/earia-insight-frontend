
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface FormData {
  query: string;
  aspect_to_analyze: string;
  analysis_type: string;
  k_retrieval: number;
  force_reprocess_entire_directory: boolean;
}

interface AnalysisFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    query: "Analizar exhaustivamente y con profundidad los objetivos principales del documento (o documentos) disponibles, sus costos asociados (si se mencionan), y sus impactos económicos directos e indirectos tanto para los operadores (pequeños y grandes) como para los consumidores finales, en el contexto de las telecomunicaciones en Colombia.",
    aspect_to_analyze: "objetivos, costos e impactos económicos generales de los documentos disponibles",
    analysis_type: "cot_analysis",
    k_retrieval: 8,
    force_reprocess_entire_directory: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, analysis_type: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({ ...prev, k_retrieval: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, force_reprocess_entire_directory: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.query.trim()) {
      toast.error("La consulta principal es requerida");
      return;
    }
    
    if (formData.k_retrieval < 1) {
      toast.error("El número de chunks debe ser al menos 1");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="query" className="text-base font-medium">
          Consulta Principal:
        </Label>
        <Textarea
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="min-h-[100px] resize-y"
          required
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="analysis_type" className="text-base font-medium">
          Tipo de Análisis para Agente 1:
        </Label>
        <Select
          value={formData.analysis_type}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione el tipo de análisis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cot_analysis">Análisis CoT Profundo</SelectItem>
            <SelectItem value="basic_rag">RAG Básico</SelectItem>
            <SelectItem value="tot_exploration">Exploración ToT</SelectItem>
            <SelectItem value="ain_extraction">
              Extracción AIN (si el documento es un AIN)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="aspect_to_analyze" className="text-base font-medium">
          Aspecto/Tema Principal a Analizar (para CoT/ToT):
        </Label>
        <Input
          id="aspect_to_analyze"
          name="aspect_to_analyze"
          value={formData.aspect_to_analyze}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="k_retrieval" className="text-base font-medium">
          Chunks a Recuperar (k) para el análisis del Agente 1:
        </Label>
        <Input
          id="k_retrieval"
          name="k_retrieval"
          type="number"
          value={formData.k_retrieval}
          onChange={handleNumberChange}
          min={1}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="force_reprocess_all"
          checked={formData.force_reprocess_entire_directory}
          onCheckedChange={handleCheckboxChange}
        />
        <Label
          htmlFor="force_reprocess_all"
          className="text-sm font-normal cursor-pointer"
        >
          Forzar Re-indexación Completa del Directorio de Documentos
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Procesando..." : "Enviar Análisis"}
      </Button>
    </form>
  );
};

export default AnalysisForm;
