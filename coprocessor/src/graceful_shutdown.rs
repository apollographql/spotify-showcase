//! Implements common graceful shutdown listeners so that connections won't be suddenly dropped
//! during deployments. Typically, this involves sending SIGTERM to the process (e.g., the default
//! for Kubernetes pods), but can also mean sending SIGINT.

use tokio::{
    select,
    signal::{
        ctrl_c,
        unix::{signal, SignalKind},
    },
};

/// Returns when receiving a signal that indicates the server should shut down gracefully. This is
/// CTRL+C on all platforms, and additionally SIGTERM on Unix platforms.
///
/// # Panics
///
/// If underlying signals cannot be attached.
#[cfg(not(target_os = "windows"))]
pub async fn graceful_shutdown() {
    let mut signal = signal(SignalKind::terminate()).unwrap();
    select! {
        _ = signal.recv() => {
            println!("Received SIGTERM, shutting down");
        }
        _ = ctrl_c() => {
            println!("Received SIGINT, shutting down");
        }
    }
}

/// Returns when receiving a signal that indicates the server should shut down gracefully. This is
/// CTRL+C on all platforms, and additionally SIGTERM on Unix platforms.
#[cfg(target_os = "windows")]
pub async fn graceful_shutdown() {
    ctrl_c().await;
    println!("Received CTRL+C, shutting down");
}
