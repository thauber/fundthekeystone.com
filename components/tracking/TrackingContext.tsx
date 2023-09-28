import mixpanel from "mixpanel-browser"
import { useRouter } from "next/router"
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
  useRef,
} from "react"

interface TrackingData {
  [key: string]: string | TrackingData | Array<string | TrackingData>
}

interface TrackFunction {
  (event: string, trackingData: TrackingData): void
}

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "")

declare global {
  interface Window {
    gtag: (
      event: string,
      action: string,
      trackingData: TrackingData | string,
      callback?: (prop: string) => void
    ) => void
  }
}

const track: TrackFunction = (event, trackingData) => {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    // eslint-disable-next-line no-console
    console.log(`Tracking event '${event}':`, trackingData)
  }
  if (typeof window != undefined) {
    if (window.gtag) {
      window.gtag("event", event, trackingData)
    }
    mixpanel.track(event, trackingData)
  }
}
// const page = "<unknown>"

type TrackContext = {
  track: TrackFunction
  page: string
}
const TrackingContext = createContext<TrackContext>({ track, page: "<unknown>" })
export const useTracking = (): TrackContext => useContext(TrackingContext)

interface TrackingWrapperProps {
  children: ReactNode
}

const getTrackingData = (element: HTMLElement) => {
  const dataset = element.dataset
  const trackingData: TrackingData = {}
  Object.keys(dataset).forEach(dataKey => {
    if (dataKey.startsWith("tr")) {
      const cleanedDataKey = dataKey.substring(2, 3).toLowerCase() + dataKey.slice(3)
      trackingData[cleanedDataKey] = dataset[dataKey] || ""
    }
  })
  return trackingData
}

const handleTracking = (page: string) => (event: MouseEvent) => {
  const element = (event.target as HTMLElement).closest("[data-tr-name]") as HTMLElement
  if (element) {
    const trackingData = getTrackingData(element)
    trackingData.page = page
    track("click", trackingData)
  }
}

const Tracked = ({ children }: TrackingWrapperProps) => {
  const trackingContainer = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [url, setUrl] = useState<string>("")
  const [page, setPage] = useState<string>("<unknown>")


  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href.split("#")[0]
      if (currentUrl !== url) {
        const timeoutId = setTimeout(() => {
          setUrl(currentUrl)
          const pageDataElement = trackingContainer.current?.querySelector(
            "[data-tr-page]"
          ) as HTMLElement
          if (pageDataElement) {
            const currentPage = pageDataElement.dataset.trPage || "<unknown>"
            setPage(currentPage)
            track("pageview", getTrackingData(pageDataElement))
          }
        }, 200)
        return () => clearTimeout(timeoutId)
      }
    }
    return
  }, [router.asPath, children, url])

  useEffect(() => {
    const trackingHandler = handleTracking(page)
    window.addEventListener("click", trackingHandler, true)
    return () => {
      window.removeEventListener("click", trackingHandler, true)
    }
  }, [page])

  return (
    <TrackingContext.Provider value={{ track, page }}>
      <div ref={trackingContainer}>{children}</div>
    </TrackingContext.Provider>
  )
}

export default Tracked
