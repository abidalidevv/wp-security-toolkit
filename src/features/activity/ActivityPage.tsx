import { useState } from "react";
import {
  LogIn,
  UserX,
  Ban,
  Activity as ActivityIcon,
  Search,
  Download,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Tab = "logins" | "failed" | "blocked" | "users";

const tabs: { id: Tab; label: string; icon: typeof LogIn; count: number }[] = [
  { id: "logins", label: "Recent Logins", icon: LogIn, count: 24 },
  { id: "failed", label: "Failed Attempts", icon: UserX, count: 47 },
  { id: "blocked", label: "Blocked IPs", icon: Ban, count: 12 },
  { id: "users", label: "User Activity", icon: ActivityIcon, count: 68 },
];

const logins = [
  { user: "sarah@studio.com", role: "Administrator", ip: "82.14.221.9", location: "Berlin, DE", device: "Chrome · macOS", when: "5 min ago", status: "success" },
  { user: "mike.chen", role: "Editor", ip: "104.28.11.44", location: "San Francisco, US", device: "Safari · iOS", when: "42 min ago", status: "success" },
  { user: "content-bot", role: "Author", ip: "10.0.0.14", location: "Internal", device: "REST API", when: "1 h ago", status: "success" },
  { user: "admin", role: "Administrator", ip: "88.221.14.10", location: "London, UK", device: "Firefox · Windows", when: "3 h ago", status: "success" },
  { user: "j.doe", role: "Subscriber", ip: "72.14.201.9", location: "Toronto, CA", device: "Chrome · Android", when: "6 h ago", status: "success" },
];

const failed = [
  { user: "admin", ip: "192.168.14.220", location: "Unknown", attempts: 8, reason: "Wrong password", when: "2 min ago" },
  { user: "administrator", ip: "45.83.201.14", location: "Amsterdam, NL", attempts: 24, reason: "Wrong password", when: "12 min ago" },
  { user: "root", ip: "185.191.171.9", location: "Sofia, BG", attempts: 4, reason: "Invalid username", when: "1 h ago" },
  { user: "sarah@studio.com", ip: "82.14.221.9", location: "Berlin, DE", attempts: 1, reason: "Wrong 2FA code", when: "3 h ago" },
];

const blocked = [
  { ip: "45.83.201.14", country: "Netherlands", reason: "Brute-force protection", attempts: 24, expires: "in 23 hours" },
  { ip: "185.191.171.9", country: "Bulgaria", reason: "Suspicious user enumeration", attempts: 41, expires: "in 5 days" },
  { ip: "103.211.19.44", country: "India", reason: "XML-RPC abuse", attempts: 112, expires: "permanent" },
  { ip: "94.102.61.7", country: "Netherlands", reason: "Manual block", attempts: 2, expires: "permanent" },
];

const users = [
  { user: "sarah@studio.com", action: "Updated post", target: "About Us", when: "8 min ago" },
  { user: "mike.chen", action: "Installed plugin", target: "Yoast SEO 22.3", when: "44 min ago" },
  { user: "admin", action: "Changed setting", target: "Permalinks structure", when: "2 h ago" },
  { user: "sarah@studio.com", action: "Deleted media", target: "banner-old.png", when: "4 h ago" },
  { user: "content-bot", action: "Created post", target: "Weekly newsletter #24", when: "6 h ago" },
];

export function ActivityPage() {
  const [tab, setTab] = useState<Tab>("logins");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Activity log</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Everything happening on your WordPress site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users, IPs..." className="pl-9 h-9 w-56 bg-card border-border" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1.5">
                Last 24 hours <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last hour</DropdownMenuItem>
              <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Tabs card */}
      <Card className="shadow-card border-border">
        <div className="border-b border-border overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors whitespace-nowrap",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-1 h-5 text-[10px] px-1.5",
                      active ? "border-primary/20 bg-primary/10 text-primary" : "bg-secondary",
                    )}
                  >
                    {t.count}
                  </Badge>
                  {active && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <CardContent className="p-0">
          {tab === "logins" && <LoginsTable />}
          {tab === "failed" && <FailedTable />}
          {tab === "blocked" && <BlockedTable />}
          {tab === "users" && <UsersTable />}
        </CardContent>
      </Card>
    </div>
  );
}

function LoginsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/40 hover:bg-secondary/40">
          <TableHead className="text-xs">User</TableHead>
          <TableHead className="text-xs">IP address</TableHead>
          <TableHead className="text-xs hidden md:table-cell">Location</TableHead>
          <TableHead className="text-xs hidden lg:table-cell">Device</TableHead>
          <TableHead className="text-xs text-right pr-6">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logins.map((l, i) => (
          <TableRow key={i}>
            <TableCell className="pl-6">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {l.user.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{l.user}</div>
                  <div className="text-xs text-muted-foreground">{l.role}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-mono text-xs">{l.ip}</TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{l.location}</TableCell>
            <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{l.device}</TableCell>
            <TableCell className="text-right pr-6 text-muted-foreground text-sm">{l.when}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function FailedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/40 hover:bg-secondary/40">
          <TableHead className="text-xs pl-6">Attempted user</TableHead>
          <TableHead className="text-xs">IP</TableHead>
          <TableHead className="text-xs hidden md:table-cell">Location</TableHead>
          <TableHead className="text-xs">Attempts</TableHead>
          <TableHead className="text-xs hidden lg:table-cell">Reason</TableHead>
          <TableHead className="text-xs text-right pr-6">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {failed.map((f, i) => (
          <TableRow key={i}>
            <TableCell className="pl-6 font-medium text-sm">{f.user}</TableCell>
            <TableCell className="font-mono text-xs">{f.ip}</TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{f.location}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  "font-medium",
                  f.attempts >= 10
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-warning/10 text-warning border-warning/30",
                )}
              >
                {f.attempts}
              </Badge>
            </TableCell>
            <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{f.reason}</TableCell>
            <TableCell className="text-right pr-6 text-muted-foreground text-sm">{f.when}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function BlockedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/40 hover:bg-secondary/40">
          <TableHead className="text-xs pl-6">IP address</TableHead>
          <TableHead className="text-xs">Country</TableHead>
          <TableHead className="text-xs hidden md:table-cell">Reason</TableHead>
          <TableHead className="text-xs">Attempts</TableHead>
          <TableHead className="text-xs">Expires</TableHead>
          <TableHead className="text-xs w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blocked.map((b) => (
          <TableRow key={b.ip}>
            <TableCell className="pl-6 font-mono text-xs">{b.ip}</TableCell>
            <TableCell className="text-sm">{b.country}</TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{b.reason}</TableCell>
            <TableCell className="text-sm">{b.attempts}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  "font-medium",
                  b.expires === "permanent"
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-secondary text-foreground/80 border-border",
                )}
              >
                {b.expires}
              </Badge>
            </TableCell>
            <TableCell className="pr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function UsersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/40 hover:bg-secondary/40">
          <TableHead className="text-xs pl-6">User</TableHead>
          <TableHead className="text-xs">Action</TableHead>
          <TableHead className="text-xs">Target</TableHead>
          <TableHead className="text-xs text-right pr-6">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u, i) => (
          <TableRow key={i}>
            <TableCell className="pl-6">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                  {u.user.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium truncate">{u.user}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm">{u.action}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{u.target}</TableCell>
            <TableCell className="text-right pr-6 text-muted-foreground text-sm">{u.when}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(err => { if (!cancelled) setState({ data: null, loading: false, error: err.message }); });
    return () => { cancelled = true; };
  }, [url]);
  return state;
}
