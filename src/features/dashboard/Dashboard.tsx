import {
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  LogIn,
  Clock,
  Play,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ScanLine,
  UserX,
  FileWarning,
  RefreshCw,
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
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "primary";

const toneStyles: Record<Tone, { icon: string; ring: string }> = {
  success: { icon: "bg-success/10 text-success", ring: "ring-success/20" },
  warning: { icon: "bg-warning/10 text-warning", ring: "ring-warning/20" },
  danger: { icon: "bg-destructive/10 text-destructive", ring: "ring-destructive/20" },
  primary: { icon: "bg-primary/10 text-primary", ring: "ring-primary/20" },
};

function StatCard({
  label,
  value,
  hint,
  tone,
  Icon,
  delta,
  progress,
}: {
  label: string;
  value: string;
  hint?: string;
  tone: Tone;
  Icon: typeof ShieldCheck;
  delta?: { value: string; up?: boolean };
  progress?: number;
}) {
  const t = toneStyles[tone];
  return (
    <Card className="shadow-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
            {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
          </div>
          <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", t.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {typeof progress === "number" && (
          <div className="mt-4">
            <Progress value={progress} className="h-1.5 bg-secondary" />
          </div>
        )}
        {delta && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                delta.up ? "text-success" : "text-destructive",
              )}
            >
              <ArrowUpRight className={cn("h-3.5 w-3.5", !delta.up && "rotate-180")} />
              {delta.value}
            </span>
            <span className="text-muted-foreground">vs last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const recentActivity = [
  {
    icon: UserX,
    tone: "danger" as Tone,
    title: "Failed login attempt",
    detail: "user: admin · IP 192.168.14.220",
    time: "2 min ago",
  },
  {
    icon: FileWarning,
    tone: "warning" as Tone,
    title: "File modified",
    detail: "/wp-content/themes/astra/functions.php",
    time: "18 min ago",
  },
  {
    icon: CheckCircle2,
    tone: "success" as Tone,
    title: "Malware scan completed",
    detail: "1,284 files scanned · 0 threats",
    time: "1 hour ago",
  },
  {
    icon: ShieldAlert,
    tone: "danger" as Tone,
    title: "IP blocked",
    detail: "45.83.201.14 · brute-force protection",
    time: "3 hours ago",
  },
  {
    icon: LogIn,
    tone: "primary" as Tone,
    title: "Admin login",
    detail: "sarah@studio.com · Chrome, macOS",
    time: "5 hours ago",
  },
];

const scans = [
  { name: "Full malware scan", status: "clean", files: "1,284", when: "Today, 09:42", duration: "3m 12s" },
  { name: "File integrity check", status: "warning", files: "482", when: "Today, 06:00", duration: "1m 04s" },
  { name: "Security headers audit", status: "clean", files: "12", when: "Yesterday, 22:15", duration: "8s" },
  { name: "Login protection sweep", status: "clean", files: "—", when: "Yesterday, 12:00", duration: "24s" },
];

const statusItems = [
  { label: "Firewall", status: "Active", tone: "success" as Tone, Icon: ShieldCheck },
  { label: "Malware Scanner", status: "Enabled", tone: "success" as Tone, Icon: ScanLine },
  { label: "Two-Factor Auth", status: "Partial", tone: "warning" as Tone, Icon: LogIn },
  { label: "Auto Updates", status: "Enabled", tone: "success" as Tone, Icon: RefreshCw },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Security overview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time status of your WordPress installation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Play className="h-4 w-4" /> Quick Scan
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard
          label="Overall Security Score"
          value="92 / 100"
          tone="success"
          Icon={ShieldCheck}
          progress={92}
          hint="Excellent — 2 recommendations"
        />
        <StatCard
          label="Threats Found"
          value="3"
          tone="danger"
          Icon={ShieldAlert}
          delta={{ value: "+2", up: false }}
        />
        <StatCard
          label="File Integrity"
          value="1,282 / 1,284"
          tone="warning"
          Icon={FileCheck2}
          hint="2 files modified"
        />
        <StatCard
          label="Login Protection"
          value="47 blocked"
          tone="primary"
          Icon={LogIn}
          delta={{ value: "+12", up: true }}
        />
        <StatCard
          label="Last Scan"
          value="09:42"
          tone="primary"
          Icon={Clock}
          hint="Today · full scan"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 shadow-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Recent Security Activity</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Events from the last 24 hours
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-accent">
              View all
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border">
              {recentActivity.map((a, i) => {
                const t = toneStyles[a.tone];
                const Icon = a.icon;
                return (
                  <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", t.icon)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{a.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">{a.time}</div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Security Status</CardTitle>
            <p className="text-xs text-muted-foreground">Core protection modules</p>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            {statusItems.map((s) => {
              const t = toneStyles[s.tone];
              const Icon = s.Icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md", t.icon)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium truncate">{s.label}</span>
                  </div>
                  <StatusBadge status={s.status} tone={s.tone} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent scans */}
      <Card className="shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base font-semibold">Recent Scan Results</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Latest 4 scans across all modules</p>
          </div>
          <Button variant="outline" size="sm">
            Scan history
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                  <TableHead className="text-xs">Scan</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Files</TableHead>
                  <TableHead className="text-xs">Duration</TableHead>
                  <TableHead className="text-xs text-right pr-4">Ran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <ScanStatus status={s.status as "clean" | "warning" | "danger"} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.files}</TableCell>
                    <TableCell className="text-muted-foreground">{s.duration}</TableCell>
                    <TableCell className="text-right pr-4 text-muted-foreground">{s.when}</TableCell>
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

function StatusBadge({ status, tone }: { status: string; tone: Tone }) {
  const map: Record<Tone, string> = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", map[tone])}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

export function ScanStatus({ status }: { status: "clean" | "warning" | "danger" }) {
  if (status === "clean")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
        <CheckCircle2 className="h-3.5 w-3.5" /> Clean
      </span>
    );
  if (status === "warning")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warning">
        <AlertTriangle className="h-3.5 w-3.5" /> Warnings
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
      <XCircle className="h-3.5 w-3.5" /> Threats
    </span>
  );
}
