export interface MatrixOption {
  id: string;
  name: string;
  icon: string;
  description?: string;
  unit?: string;
}

export interface MatrixRow {
  structure: string;
  rating: string;
  conditions: string[];
  sku: string;
  name: string;
  consumption: number;
  consumption_unit: string;
  price_per_unit: number;
}

export interface MatrixData {
  objectTypes: MatrixOption[];
  structures: MatrixOption[];
  ratings: string[];
  conditions: MatrixOption[];
  matrix: MatrixRow[];
}
