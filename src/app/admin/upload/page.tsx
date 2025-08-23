import { CsvUploader } from "@/components/csv-uploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, ListChecks } from "lucide-react";

export default function AdminUploadPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            Cargar Catálogo de Productos
          </CardTitle>
          <CardDescription>
            Sube un archivo CSV para agregar o actualizar productos en el catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-6 rounded-lg mb-6">
            <h3 className="font-headline text-lg font-semibold flex items-center gap-2 mb-3">
              <ListChecks className="h-5 w-5" />
              Formato del CSV
            </h3>
            <p className="text-sm text-muted-foreground">
              El archivo debe contener las siguientes columnas en este orden:
            </p>
            <code className="block bg-background p-3 rounded-md text-sm mt-2 overflow-x-auto font-code">
              marca,modelo,año,linea,descripcion,sku,precio,imagen_url
            </code>
              <p className="text-xs text-muted-foreground mt-2">
              La primera fila debe ser el encabezado con estos nombres de columna.
            </p>
          </div>

          <CsvUploader />

        </CardContent>
      </Card>
    </div>
  );
}
