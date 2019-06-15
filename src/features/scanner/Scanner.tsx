import {
  Play,
  RefreshCw,
  ShieldCheck,
  FileCode2,
  Globe2,
  History,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScanStatus } from "@/features/dashboard/Dashboard";
import { cn } from "@/lib/utils";

const malware = [
  {
    file: "/wp-content/plugins/old-cache/loader.php",
    threat: "Backdoor.PHP.Agent",
    severity: "critical",
    detected: "Today, 09:41",
  },
  {
    file: "/wp-content/uploads/2024/03/img_2242.php",
    threat: "PHP.Suspicious.Uploader",
    severity: "high",
    detected: "Today, 09:41",
  },
  {
    file: "/wp-includes/js/tinymce/plugins/wp-embed.min.js",
    threat: "JS.Obfuscated.Redirect",
    severity: "medium",
    detected: "Yesterday, 22:15",
  },
];

const fileChanges = [
  { file: "wp-config.php", type: "modified", user: "system", when: "Today, 04:12" },
  { file: "wp-content/themes/astra/functions.php", type: "modified", user: "sarah@studio.com", when: "Yesterday, 18:22" },
  { file: "wp-content/plugins/yoast-seo/index.php", type: "added", user: "auto-update", when: "Yesterday, 12:04" },
  { file: ".htaccess", type: "modified", user: "admin", when: "3 days ago" },
];

const headers = [
  { name: "Strict-Transport-Security", status: "pass" },
  { name: "Content-Security-Policy", status: "warn" },
  { name: "X-Frame-Options", status: "pass" },
  { name: "X-Content-Type-Options", status: "pass" },
  { name: "Referrer-Policy", status: "warn" },
  { name: "Permissions-Policy", status: "fail" },
];

const history = [
  { id: "SC-2841", type: "Full scan", status: "clean", files: 1284, when: "Today, 09:42", duration: "3m 12s" },
  { id: "SC-2840", type: "File integrity", status: "warning", files: 482, when: "Today, 06:00", duration: "1m 04s" },
  { id: "SC-2839", type: "Headers audit", status: "warning", files: 12, when: "Yesterday, 22:15", duration: "8s" },
  { id: "SC-2838", type: "Full scan", status: "danger", files: 1281, when: "Yesterday, 09:42", duration: "3m 20s" },
  { id: "SC-2837", type: "File integrity", status: "clean", files: 481, when: "2 days ago", duration: "58s" },
];

export function Scanner() {
  return (
    <div className="space-y-6">
      {/* Hero scan card */}
      <Card className="shadow-card border-border overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 min-w-0">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-semibold">Malware & vulnerability scan</h2>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    Ready
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Last scan completed today at 09:42 · 1,284 files inspected
                </p>
                <div className="mt-3 max-w-md">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Signature database</span>
                    <span>Up to date · v2026.44.2</span>
                  </div>
                  <Progress value={100} className="h-1.5 bg-secondary" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" /> Update signatures
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="h-4 w-4" /> Run full scan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Malware + File Changes */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-destructive" />
                Malware Detection
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">3 active threats found</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-accent">
              Quarantine all
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                    <TableHead className="text-xs">File</TableHead>
                    <TableHead className="text-xs">Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {malware.map((m) => (
                    <TableRow key={m.file}>
                      <TableCell className="max-w-[260px]">
                        <div className="text-sm font-medium truncate">{m.threat}</div>
                        <div className="text-xs text-muted-foreground truncate font-mono">{m.file}</div>
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={m.severity as "critical" | "high" | "medium"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-warning" />
                File Changes
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-accent">
              View all
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                    <TableHead className="text-xs">File</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs text-right pr-4">When</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fileChanges.map((f) => (
                    <TableRow key={f.file}>
                      <TableCell className="max-w-[220px]">
                        <div className="text-sm font-medium truncate font-mono">{f.file}</div>
                        <div className="text-xs text-muted-foreground truncate">by {f.user}</div>
                      </TableCell>
                      <TableCell>
                        <ChangeBadge type={f.type as "modified" | "added" | "deleted"} />
                      </TableCell>
                      <TableCell className="text-right pr-4 text-xs text-muted-foreground">
                        {f.when}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Headers */}
      <Card className="shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-primary" />
              Security Headers
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              HTTP response header audit for https://example-site.com
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Re-check
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {headers.map((h) => (
              <div
                key={h.name}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <span className="text-sm font-medium font-mono truncate mr-2">{h.name}</span>
                <HeaderStatus status={h.status as "pass" | "warn" | "fail"} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scan History */}
      <Card className="shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              Scan History
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Chronological log of past scans</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Files</TableHead>
                  <TableHead className="text-xs">Duration</TableHead>
                  <TableHead className="text-xs">When</TableHead>
                  <TableHead className="text-xs w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="font-mono text-xs">{h.id}</TableCell>
                    <TableCell className="font-medium">{h.type}</TableCell>
                    <TableCell>
                      <ScanStatus status={h.status as "clean" | "warning" | "danger"} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{h.files}</TableCell>
                    <TableCell className="text-muted-foreground">{h.duration}</TableCell>
                    <TableCell className="text-muted-foreground">{h.when}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" | "low" }) {
  const map = {
    critical: "bg-destructive/10 text-destructive border-destructive/20",
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/30",
    low: "bg-primary/10 text-primary border-primary/20",
  } as const;
  return (
    <Badge variant="outline" className={cn("capitalize font-medium", map[severity])}>
      {severity}
    </Badge>
  );
}

function ChangeBadge({ type }: { type: "modified" | "added" | "deleted" }) {
  const map = {
    modified: "bg-warning/10 text-warning border-warning/30",
    added: "bg-success/10 text-success border-success/20",
    deleted: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Badge variant="outline" className={cn("capitalize font-medium", map[type])}>
      {type}
    </Badge>
  );
}

function HeaderStatus({ status }: { status: "pass" | "warn" | "fail" }) {
  if (status === "pass")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-success shrink-0">
        <CheckCircle2 className="h-3.5 w-3.5" /> Pass
      </span>
    );
  if (status === "warn")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-warning shrink-0">
        <AlertTriangle className="h-3.5 w-3.5" /> Warn
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive shrink-0">
      <XCircle className="h-3.5 w-3.5" /> Missing
    </span>
  );
}


import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="form-group">
        <label htmlFor={inputId} className="form-label">{label}</label>
        <input ref={ref} id={inputId} className={`form-input ${error ? 'error' : ''}`} {...props} />
        {hint && !error && <p className="form-hint">{hint}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
