// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{ path::Path};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use rust_search::SearchBuilder;

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
        .invoke_handler(tauri::generate_handler![get_file_list,search_function,check_file_extension,open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}