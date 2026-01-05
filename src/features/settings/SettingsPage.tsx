import { useState } from "react";
import { Save, ShieldCheck, Bell, ScanLine, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const [autoScan, setAutoScan] = useState(true);
  const [scanFreq, setScanFreq] = useState("daily");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [email, setEmail] = useState("security@studio.com");
  const [level, setLevel] = useState<"basic" | "balanced" | "strict">("balanced");

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure scans, alerts and protection level.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Settings saved", { description: "Your changes are live." })}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Save className="h-4 w-4" /> Save settings
        </Button>
      </div>

      {/* Auto scan */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-primary" />
            Auto Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row
            title="Enable scheduled scans"
            description="Automatically scan your site on a recurring schedule."
          >
            <Switch checked={autoScan} onCheckedChange={setAutoScan} />
          </Row>
          <Row title="Scan frequency" description="How often malware and integrity scans should run.">
            <Select value={scanFreq} onValueChange={setScanFreq} disabled={!autoScan}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </CardContent>
      </Card>

      {/* Email alerts */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Email Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row title="Send email notifications" description="Get notified when new threats or events are detected.">
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </Row>
          <Row title="Notification email" description="Where security alerts will be delivered.">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!emailAlerts}
              className="w-64"
            />
          </Row>
          <Row title="Critical alerts only" description="Only send emails for high and critical severity events.">
            <Switch
              checked={criticalOnly}
              onCheckedChange={setCriticalOnly}
              disabled={!emailAlerts}
            />
          </Row>
        </CardContent>
      </Card>

      {/* Security level */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Security Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              [
                { id: "basic", title: "Basic", desc: "Essential protections. Lowest performance impact." },
                { id: "balanced", title: "Balanced", desc: "Recommended for most WordPress sites." },
                { id: "strict", title: "Strict", desc: "Maximum protection. May affect performance." },
              ] as const
            ).map((opt) => {
              const active = level === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setLevel(opt.id)}
                  className={cn(
                    "text-left rounded-xl border p-4 transition-all",
                    active
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{opt.title}</span>
                    {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button
          onClick={() => toast.success("Settings saved")}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Save className="h-4 w-4" /> Save settings
        </Button>
      </div>
    </div>
  );
}

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2">
      <div className="min-w-0">
        <Label className="text-sm font-medium">{title}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}


import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="error-boundary">
          <h2>Something went wrong</h2>
          <details><summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}


import { useState, useCallback } from 'react';

interface AsyncState<T> { data: T | null; loading: boolean; error: string | null; }

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });
  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      setState({ data: null, loading: false, error });
      throw e;
    }
  }, []);
  return { ...state, execute };
}


import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}
