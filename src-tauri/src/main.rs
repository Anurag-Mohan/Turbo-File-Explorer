// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{path::Path, ffi::OsStr};
use sysinfo::{System, SystemExt};
use serde::Serialize; 
use sysinfo::DiskExt;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use rust_search::SearchBuilder;

#[derive(Serialize)]
pub struct DriveData {
    name: String,
    color: String,
    space: u64,
}

impl DriveData {
    fn from(disk: &sysinfo::Disk, drive_letter: char) -> Self {
        let total_space = disk.total_space();
        let available_space = disk.available_space();
        let used_space = total_space - available_space;

        let space_percentage = if total_space > 0 {
            (used_space * 100) / total_space
        } else {
            0
        };

        let name = format!("Drive {}", drive_letter);

        let color = if space_percentage > 75 {
            "danger".to_string()
        } else if space_percentage >= 50 {
            "warning".to_string()
        } else if space_percentage >= 25 {
            "success".to_string()
        } else {
            "info".to_string()
        };

        Self {
            name,
            color,
            space: space_percentage,
        }
    }
}

#[tauri::command]
fn get_drive_data() -> Result<Vec<serde_json::Value>, String> {
    let mut sys = System::new_all();
    sys.refresh_all();

    let drive_data: Vec<DriveData> = sys
        .disks()
        .iter()
        .zip('C'..)
        .map(|(disk, letter)| DriveData::from(disk, letter))
        .collect();

    let serialized_drives: Vec<serde_json::Value> = drive_data
        .iter()
        .map(|drive| serde_json::to_value(drive).map_err(|e| e.to_string()))
        .collect::<Result<Vec<_>, _>>()?;

    Ok(serialized_drives)
}


#[tauri::command]
fn get_file_list(path:String)-> Vec<String>{

let files: Vec<String> = SearchBuilder::default()
    .location(path)
    .depth(1)
    .build()
    .collect();
    return files;
}

#[tauri::command]
fn search_function(path:String,search_inp:String)-> Vec<String>{
let files: Vec<String> = SearchBuilder::default()
    .location(path)
    .search_input(search_inp)
    .ignore_case()
    .build()
    .collect();

    println!("{:#?}",files);
    return files;
}



#[tauri::command]
fn check_file_extension(path: String) -> Option<String> {
   
    let path = Path::new(&path);

   
    let extension = path.extension()?.to_str()?.to_string();
    Some(extension)
}



#[tauri::command]

fn open_file(path:String){
    let _result=opener::open(std::path::Path::new(&path));
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_drive_data,get_file_list,search_function,check_file_extension,open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}