"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, File } from "lucide-react"

interface FileUploadProps {
  label: string
  accept: string
  value?: File
  onChange: (file: File | undefined) => void
  error?: string
  className?: string
}

export function FileUpload({
  label,
  accept,
  value,
  onChange,
  error,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || undefined
    onChange(file)
  }

  const handleRemoveFile = () => {
    onChange(undefined)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {value ? "Alterar arquivo" : "Selecionar arquivo"}
        </Button>
        {value && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <File className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{value.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
