import { TFile } from "obsidian";

export type Company = {
  companyname: string;
  department: string;
  title: string;
  name: string;
  lastName: string;
  phone: string;
  website: string;
  emailmain: string;
  file: TFile;
  lastContact?: Date;
  founding?: Date;
}