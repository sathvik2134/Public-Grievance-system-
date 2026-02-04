package com.grievance.app.dto.admin;

public class AdminMetricsDTO {

    private long total;
    private long pending;
    private long inProgress;
    private long resolved;
    private long cancelled;

    public void setTotal(long total) {
        this.total = total;
    }

    public void setPending(long pending) {
        this.pending = pending;
    }

    public void setInProgress(long inProgress) {
        this.inProgress = inProgress;
    }

    public void setResolved(long resolved) {
        this.resolved = resolved;
    }

    public void setCancelled(long cancelled) {
        this.cancelled = cancelled;
    }
}


