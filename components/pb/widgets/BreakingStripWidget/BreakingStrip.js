import AppLink from "@/components/AppLink";
import styles from "./BreakingStrip.module.css";

export default function BreakingStripWidget({ widget }) {
  return (
    <div className="container">
      <section className={styles.tv9_breakingStrip}>
        <strong>Tamilnadu News</strong>
        <AppLink href="#">
          தமிழக காவல்துறைக்கு புது ரத்தம் பாய்ச்சிய முதல்வர் விஜய்!
        </AppLink>
      </section>
    </div>
  );
}
