import BreakingNewsStrip from "../BreakingNewsStripWidget/BreakingNewsStrip";

export default function BreakingStripWidget(props) {
  return (
    <div className="container">
      <BreakingNewsStrip {...props} />
    </div>
  );
}
