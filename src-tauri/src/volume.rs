

use std::path::PathBuf;

use serde::Serialize;
use sysinfo::{self, Disk, DiskExt,System, SystemExt};



#[derive(Serialize)]
#[derive(Debug)]
pub struct Volume {
    name: String,
    available_gb: u16,
    used_gb: u16,
    total_gb: u16,
    mountpoint:PathBuf,
}


impl Volume{

    fn from(disk: &Disk) -> Self {

      
        let used_gb = ((disk.total_space() - disk.available_space())/1_073_741_824) as u16;
        let available_gb = (disk.available_space()/1_073_741_824) as u16;
        let total_gb = (disk.total_space()/1_073_741_824) as u16;

        let name = {
            let volume_name = disk.name().to_str().unwrap();
            match volume_name.is_empty() {
                true => "Local Disk",
                false => volume_name,
            }
            .to_string()
        };

        let mountpoint=disk.mount_point().to_path_buf();

        Self {
            name,
            available_gb,
            used_gb,
            total_gb,
            mountpoint
           
        }
    }

}

#[tauri::command]
pub fn get_volume()->Vec<Volume>{
    let mut sys = System::new_all();
    sys.refresh_all();
    let volumes :Vec<Volume>= sys
    .disks()
    .iter()
    .map(|disk| {
        let volume = Volume::from(disk);
        volume
    })
    .collect();
    println!("{:?}",volumes);
    volumes
}