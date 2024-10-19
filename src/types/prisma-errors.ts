export interface PrismaErrorMeta {
    target?: string[];
    field_name?: string;
    cause?: string;
  }
  
  export interface PrismaError {
    code: string;
    meta?: PrismaErrorMeta;
  }
  