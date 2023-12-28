// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod volume;

use std::{path::Path, alloc::System, time::SystemTime};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use rust_search::SearchBuilder;
use serde::Serialize;
use chrono::{DateTime, Utc};
use crate::volume::get_volume;
use chrono::TimeZone;

#[derive(Debug, Serialize)]
struct FileDetails {
    file_type: String,
    size: String,
    modified_date: String,
    extension: String, }

fn format_size(size: u64) -> String {
    const KB: f64 = 1024.0;
    const MB: f64 = KB * 1024.0;
    const GB: f64 = MB * 1024.0;

    if size < KB as u64 {
        format!("{} B", size)
    } else if size < MB as u64 {
        format!("{:.2} KB", size as f64 / KB)
    } else if size < GB as u64 {
        format!("{:.2} MB", size as f64 / MB)
    } else {
        format!("{:.2} GB", size as f64 / GB)
    }
}

fn format_date(timestamp: u64) -> String {
    let datetime: DateTime<Utc> = Utc.timestamp(timestamp as i64, 0);
    datetime.format("%Y-%m-%d %H:%M:%S").to_string()
}

#[tauri::command]
fn get_file_info(path: String) -> Option<FileDetails> {
    let metadata = std::fs::metadata(&path).ok()?;

    let file_type = if metadata.is_file() {
        "File".to_string()
    } else if metadata.is_dir() {
        "Directory".to_string()
    } else {
        "Other".to_string()
    };

    let size = format_size(metadata.len());
    let modified_date = format_date(metadata.modified().ok()?.duration_since(SystemTime::UNIX_EPOCH).ok()?.as_secs());

    
    let extension = if metadata.is_file() {
        let path = Path::new(&path);
        path.extension()?.to_str()?.to_string()
    } else {
        "N/A".to_string()
    };

    Some(FileDetails {
        file_type,
        size,
        modified_date,
        extension,
    })
}
#[tauri::command]
fn get_file_list(path: String) -> Vec<String> {
    let files: Vec<String> = SearchBuilder::default()
        .location(path)
        .depth(1)
        .build()
        .collect();
    files
}

#[tauri::command]
fn search_function(path: String, search_inp: String) -> Vec<String> {
    let files: Vec<String> = SearchBuilder::default()
        .location(path)
        .search_input(search_inp)
        .ignore_case()
        .build()
        .collect();

    println!("{:#?}", files);
    files
}

#[tauri::command]
fn check_file_extension(path: String) -> Option<String> {
    let path = Path::new(&path);

    let extension = path.extension()?.to_str()?.to_string();
    Some(extension)
}

#[tauri::command]
fn open_file(path: String) {
    let _result = opener::open(Path::new(&path));
}

fn main() {
    volume::get_volume();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_file_list,
            search_function,
            check_file_extension,
            open_file,
            get_volume,
            get_file_info,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
