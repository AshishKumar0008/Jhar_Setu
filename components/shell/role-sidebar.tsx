"use client";

import React, { useEffect } from "react";
import { UserRole } from "./app-navbar";
import {
  X,
  LayoutDashboard,
  Inbox,
  FileCheck2,
  Layers,
  Route,
  Sparkles,
  Award,
  FileText,
  GitFork,
  History,
  Briefcase,
  ClockAlert,
  CheckCircle2,
  CheckSquare,
  FolderKanban,
  GraduationCap,
  Handshake,
  ShieldCheck,
  PlayCircle,
  BarChart3,
  Scale,
  FileSpreadsheet,
  CreditCard,
  Compass,
  FileSearch,
  Bookmark,
  Edit3,
  Users,
  Bell,
  Building2,
  Landmark,
  Users2,
  TrendingUp,
  Activity,
  UserCheck,
  KeyRound,
  Tags,
  MapPin,
  GitMerge,
  Mail,
  Cpu,
  Search,
  Database,
  LucideIcon,
} from "lucide-react";

export interface NavItemConfig {
  id: string;
  label: string;
  hindiLabel?: string;
  icon: LucideIcon;
  badge?: string | number;
}

export const ROLE_NAV_CONFIGS: Record<
  Exclude<UserRole, "citizen" | "assisted_operator">,
  NavItemConfig[]
> = {
  reviewer: [
    { id: "dashboard", label: "Dashboard", hindiLabel: "डैशबोर्ड", icon: LayoutDashboard },
    { id: "review-queue", label: "Review queue", hindiLabel: "समीक्षा कतार", icon: Inbox, badge: "3" },
    { id: "report-decision-card", label: "Report decision card", hindiLabel: "निर्णय पत्रक", icon: FileCheck2 },
    { id: "cluster-explorer", label: "Cluster explorer", hindiLabel: "समूह अन्वेषक", icon: Layers },
    { id: "authority-routing", label: "Authority routing", hindiLabel: "प्राधिकरण मार्ग", icon: Route },
    { id: "path-c-candidates", label: "Path C candidates", hindiLabel: "पथ C प्रत्याशी", icon: Sparkles },
    { id: "innovation-gap-certs", label: "Innovation Gap Certificates", hindiLabel: "नवाचार अंतराल प्रमाण पत्र", icon: Award },
    { id: "challenge-passport-editor", label: "Challenge Passport editor", hindiLabel: "चुनौती पासपोर्ट संपादक", icon: FileText },
    { id: "matching-runs", label: "Matching runs", hindiLabel: "मिलान सत्र", icon: GitFork },
    { id: "audit-view", label: "Audit view", hindiLabel: "ऑडिट अवलोकन", icon: History },
  ],
  department_officer: [
    { id: "dashboard", label: "Dashboard", hindiLabel: "डैशबोर्ड", icon: LayoutDashboard },
    { id: "assigned-cases", label: "Assigned authority cases", hindiLabel: "आवंटित मामले", icon: Briefcase, badge: "5" },
    { id: "case-detail-actions", label: "Case detail / actions", hindiLabel: "मामला विवरण / कार्रवाई", icon: FileText },
    { id: "sla-overdue-queue", label: "SLA / overdue queue", hindiLabel: "एस.एल.ए / अतिदेय कतार", icon: ClockAlert, badge: "1" },
    { id: "resolution-verification", label: "Resolution verification", hindiLabel: "समाधान सत्यापन", icon: CheckCircle2 },
  ],
  government: [
    { id: "dashboard", label: "Dashboard", hindiLabel: "डैशबोर्ड", icon: LayoutDashboard },
    { id: "validation-queue", label: "Validation queue", hindiLabel: "सत्यापन कतार", icon: CheckSquare, badge: "2" },
    { id: "challenge-portfolio", label: "Challenge portfolio", hindiLabel: "चुनौती पोर्टफोलियो", icon: FolderKanban },
    { id: "university-proposals", label: "University proposals", hindiLabel: "विश्वविद्यालय प्रस्ताव", icon: GraduationCap },
    { id: "commitment-status", label: "Commitment status", hindiLabel: "प्रतिबद्धता स्थिति", icon: Handshake },
    { id: "pilot-readiness", label: "Pilot readiness", hindiLabel: "पायलट तत्परता", icon: ShieldCheck },
    { id: "active-pilots", label: "Active pilots", hindiLabel: "सक्रिय पायलट", icon: PlayCircle },
    { id: "evaluation", label: "Evaluation", hindiLabel: "मूल्यांकन", icon: BarChart3 },
    { id: "adoption-decisions", label: "Adoption decisions", hindiLabel: "अंगीकरण निर्णय", icon: Scale },
    { id: "aggregate-reports", label: "Aggregate reports", hindiLabel: "समेकित रिपोर्ट", icon: FileSpreadsheet },
  ],
  university: [
    { id: "dashboard", label: "Dashboard", hindiLabel: "डैशबोर्ड", icon: LayoutDashboard },
    { id: "capability-card", label: "Capability card", hindiLabel: "क्षमता पत्रक", icon: CreditCard },
    { id: "challenge-marketplace", label: "Challenge marketplace", hindiLabel: "चुनौती बाज़ार", icon: Compass },
    { id: "challenge-detail", label: "Challenge detail", hindiLabel: "चुनौती विवरण", icon: FileSearch },
    { id: "interests", label: "Interests", hindiLabel: "रुचियां", icon: Bookmark },
    { id: "proposal-workspace", label: "Proposal workspace", hindiLabel: "प्रस्ताव कार्यक्षेत्र", icon: Edit3 },
    { id: "team-mentors", label: "Team / mentors", hindiLabel: "दल / मार्गदर्शक", icon: Users },
    { id: "notifications", label: "Notifications", hindiLabel: "सूचनाएं", icon: Bell, badge: "4" },
  ],
  industry_csr: [
    { id: "dashboard", label: "Dashboard", hindiLabel: "डैशबोर्ड", icon: LayoutDashboard },
    { id: "org-verification", label: "Organization verification", hindiLabel: "संस्था सत्यापन", icon: Building2 },
    { id: "challenge-marketplace", label: "Challenge marketplace", hindiLabel: "चुनौती बाज़ार", icon: Compass },
    { id: "challenge-detail", label: "Challenge detail", hindiLabel: "चुनौती विवरण", icon: FileSearch },
    { id: "commitments-ledger", label: "Commitments ledger", hindiLabel: "प्रतिबद्धता बही", icon: Landmark },
    { id: "mentor-roster", label: "Mentor roster", hindiLabel: "मार्गदर्शक सूची", icon: Users2 },
    { id: "impact-reports", label: "Impact / status reports", hindiLabel: "प्रभाव रिपोर्ट", icon: TrendingUp },
  ],
  admin: [
    { id: "dashboard-health", label: "Dashboard/health", hindiLabel: "डैशबोर्ड / स्वास्थ्य", icon: Activity },
    { id: "users-org-verification", label: "Users and org verification", hindiLabel: "उपयोगकर्ता सत्यापन", icon: UserCheck },
    { id: "roles-scopes", label: "Roles and scopes", hindiLabel: "भूमिकाएं एवं सीमाएं", icon: KeyRound },
    { id: "taxonomy", label: "Taxonomy", hindiLabel: "वर्गीकरण", icon: Tags },
    { id: "location-hierarchy", label: "Location hierarchy", hindiLabel: "स्थान पदानुक्रम", icon: MapPin },
    { id: "authority-mappings", label: "Authority mappings", hindiLabel: "प्राधिकरण मानचित्रण", icon: GitMerge },
    { id: "notification-templates", label: "Notification templates", hindiLabel: "सूचना प्रारूप", icon: Mail },
    { id: "model-prompt-registry", label: "Model/prompt registry", hindiLabel: "मॉडल व प्रॉम्प्ट पंजी", icon: Cpu },
    { id: "audit-search", label: "Audit search", hindiLabel: "ऑडिट खोज", icon: Search },
    { id: "data-retention-export", label: "Data retention/export controls", hindiLabel: "डेटा प्रतिधारण व निर्यात", icon: Database },
  ],
};

const ROLE_TITLES: Record<
  Exclude<UserRole, "citizen" | "assisted_operator">,
  { en: string; hi: string }
> = {
  reviewer: { en: "Reviewer Workspace", hi: "समीक्षक कार्यक्षेत्र" },
  department_officer: { en: "Department Officer", hi: "विभागीय अधिकारी" },
  government: { en: "Government Validation", hi: "सरकारी सत्यापन" },
  university: { en: "University Partner", hi: "विश्वविद्यालय भागीदार" },
  industry_csr: { en: "Industry & CSR Partner", hi: "उद्योग व सीएसआर भागीदार" },
  admin: { en: "System Administrator", hi: "प्रणाली प्रशासक" },
};

export interface RoleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  activeItemId?: string;
  onSelectItem?: (itemId: string) => void;
  className?: string;
}

export function RoleSidebar({
  isOpen,
  onClose,
  currentRole,
  activeItemId,
  onSelectItem,
  className = "",
}: RoleSidebarProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Citizen and assisted operator do not have role sidebars (public pages)
  if (currentRole === "citizen" || currentRole === "assisted_operator") {
    return null;
  }

  const roleKey = currentRole as Exclude<UserRole, "citizen" | "assisted_operator">;
  const navItems = ROLE_NAV_CONFIGS[roleKey] || [];
  const roleTitle = ROLE_TITLES[roleKey] || { en: currentRole, hi: "" };

  const currentActive = activeItemId || (navItems.length > 0 ? navItems[0].id : "");

  return (
    <>
      {/* Floating Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Floating Role Sidebar Panel: Slides in from left, floats above page canvas without pushing content */}
      <aside
        aria-label={`${roleTitle.en} navigation`}
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white border-r border-[#E2E5EA] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
      >
        {/* Sidebar Header: Current Role Name + Close Button */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-[#E2E5EA] bg-[#F7F8FA]/60">
          <div className="flex flex-col min-w-0 pr-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F62B4]">
              Role Navigation
            </span>
            <h2 className="text-base font-bold text-[#111827] truncate">
              {roleTitle.en}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#E2E5EA]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F62B4]"
            aria-label="Close navigation sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Item List: Fixed master screen tree per role */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Workspace Views ({navItems.length})
          </div>

          {navItems.map((item) => {
            const isActive = currentActive === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectItem?.(item.id);
                }}
                className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all text-left ${
                  isActive
                    ? "bg-[#0F62B4]/10 text-[#0F62B4] font-bold border-l-4 border-l-[#0F62B4] shadow-xs"
                    : "text-[#111827] font-medium hover:bg-[#F7F8FA] hover:text-[#0F62B4] border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? "text-[#0F62B4]" : "text-[#6B7280] group-hover:text-[#0F62B4]"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`shrink-0 ml-2 px-1.5 py-0.5 text-[10px] rounded-full font-bold leading-none ${
                      isActive
                        ? "bg-[#0F62B4] text-white"
                        : "bg-[#E2E5EA] text-[#111827]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Informational / System metadata only. No "New Project" record creation button! */}
        <div className="p-4 border-t border-[#E2E5EA] bg-[#F7F8FA]/50 text-[11px] text-[#6B7280]">
          <div className="flex items-center justify-between">
            <span>SIH 26043 Architecture</span>
            <span className="font-mono text-[10px] text-[#0F62B4]">v2.1</span>
          </div>
          <p className="mt-1 text-[10px] text-[#6B7280]">
            Human-governed civic decision system
          </p>
        </div>
      </aside>
    </>
  );
}
