// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use rust_search::SearchBuilder;
#[tauri::command]
fn get_file_list(path:String  )-> Vec<String>{

let files: Vec<String> = SearchBuilder::default()
    .location(path)
    .depth(1)
    .build()
    .collect();


return files;
}

#[tauri::command]
fn search_files(query: String, path: String) -> Vec<String> {
    let files: Vec<String> = SearchBuilder::default()
        .search_input(query)
        .location(path)
        .depth(1)
        .build()
        .collect();

    files
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_file_list,search_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
