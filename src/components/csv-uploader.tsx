'use client';

import { useState, type ChangeEvent, type DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function CsvUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/csv') {
          toast({
          title: "Error de archivo",
          description: "Por favor, selecciona un archivo CSV.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type !== 'text/csv') {
          toast({
          title: "Error de archivo",
          description: "Por favor, suelta un archivo CSV.",
          variant: "destructive",
        });
        return;
        }
        setFile(droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };


  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    clearInterval(interval);
    setProgress(100);

    setTimeout(() => {
      toast({
        title: "Carga Exitosa",
        description: `El archivo "${file.name}" ha sido procesado.`,
      });
      setIsUploading(false);
      setFile(null);
    }, 500);
  };

  return (
    <div className="space-y-4">
        <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors",
          isDragging ? "border-primary bg-primary/10" : "border-border"
        )}
      >
        <UploadCloud className="w-12 h-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
        </p>
        <p className="text-xs text-muted-foreground">CSV (MAX. 5MB)</p>
        <input id="dropzone-file" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept=".csv" />
      </div>

      {file && !isUploading && (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Subiendo {file?.name}...</p>
          <Progress value={progress} />
        </div>
      )}
      
      <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full bg-primary hover:bg-primary/90">
        {isUploading ? 'Procesando...' : 'Iniciar Carga'}
      </Button>
    </div>
  );
}
