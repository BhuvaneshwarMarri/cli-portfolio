import './timelineitem.css'

export type TimelineItemType = {
  year: string
  title: string
  place: string
  detail: string
  tags: string[]
  status?: "done" | "active" | "next"
}

type Props = {
  item: TimelineItemType
  isLast: boolean
}

export function TimelineItem({item, isLast }: Props) {

  const isActive = item.status === "active"
  const isNext = item.status === "next"
  const isDone = item.status === "done"

  const nodeChar = isActive ? "◉" : isNext ? "◌" : "●"

  return (

    <div className="timeline-row">

      <div className="timeline-left">

        <span
          className={`timeline-year ${isActive
            ? "timeline-year-active"
            : isNext
              ? "timeline-year-next"
              : "timeline-year-done"
            }`}
        >
          {item.year}
        </span>

        <span
          className={`timeline-node ${isActive
            ? "timeline-node-active"
            : isNext
              ? "timeline-node-next"
              : "timeline-node-done"
            }`}
        >
          {nodeChar}
        </span>

        {!isLast && (
          <div
            className="timeline-line"
            style={{
              background: isNext
                ? "repeating-linear-gradient(to bottom,var(--accent3) 0,var(--accent3) 4px,transparent 4px,transparent 8px)"
                : isDone
                  ? "var(--border-dim)"
                  : "var(--accent3)"
            }}
          />
        )}

      </div>


      <div
        className={`timeline-card ${isActive
          ? "timeline-card-active"
          : isNext
            ? "timeline-card-next"
            : "timeline-card-done"
          }`}
        style={{ marginBottom: isLast ? "0" : "6px" }}
      >

        <div className="timeline-title-row">

          <span
            className={`timeline-title ${isActive
              ? "timeline-title-active"
              : isNext
                ? "timeline-title-next"
                : "timeline-title-done"
              }`}
          >
            {isActive ? "✓ " : isNext ? "→ " : ""}
            {item.title}
          </span>

          {(isActive || isNext) && (
            <span
              className={`timeline-badge ${isActive
                ? "timeline-badge-active"
                : "timeline-badge-next"
                }`}
            >
              {isActive ? "CURRENT" : "NEXT"}
            </span>
          )}

        </div>

        <div className="timeline-place">
          {item.place}
        </div>

        <div className="timeline-detail">
          {item.detail}
        </div>

        <div className="timeline-tags">
          {item.tags.map(tag => (
            <span key={tag} className="timeline-tag">
              {tag}
            </span>
          ))}
        </div>

      </div>

    </div>

  )
}