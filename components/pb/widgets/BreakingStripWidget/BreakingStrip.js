import AppLink from "@/components/AppLink";
import styles from "./BreakingStrip.module.css";

export default function BreakingStripWidget({ widget }) {
  return (
    <div className="container">
      <section className={styles.tv9_breakingStrip}>
        <strong>NEWS UPDATE</strong>
        <AppLink href="#">
        മുഖ്യമന്ത്രി വിജയ് തമിഴ്‌നാട് പോലീസിന് പുതുജീവൻ പകർന്നുനൽകി!
        </AppLink>
      </section>
    </div>
  );
}
