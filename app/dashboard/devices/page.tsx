import { DeviceConfiguration } from "@/components/devices/device-configuration"
import { DatasetInformation } from "@/components/devices/dataset-information"

export default function DevicesPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <DeviceConfiguration />
      <DatasetInformation />
    </div>
  )
}
