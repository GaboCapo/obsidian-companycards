import { TFile } from "obsidian";

export type Company = {
  name: string;
  lastName: string;
  phone: string;
  file: TFile;
  lastContact?: Date;
  founding?: Date;
}