import { useParams } from "react-router-dom";
import { AutoRefreshStatus } from "@/components/AutoRefreshStatus";
import { JobTree } from "@/components/JobTree";
import { JobView } from "@/components/JobView";
import { LoadNavLink } from "@/components/LoadNavLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useJob } from "@/hooks/useJob";
import { getShortId } from "@/lib/helpers";

export function JobPage() {
  const { id } = useParams() as { id: string };

  const result = useJob(id);
  const { job, rootJob } = result;

  return (
    <>
      <div className="min-h-14 border-b flex px-4 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <LoadNavLink to="/jobs">Jobs</LoadNavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getShortId(id)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <AutoRefreshStatus />
        </div>
      </div>
      <div className="flex grow basis-0 overflow-hidden">
        <div className="px-4 py-2 border-r min-w-[300px] overflow-auto grow">
          <JobTree job={rootJob} activeId={id!} depth={0} />
        </div>
        <div className="overflow-auto p-4 grow">
          <JobView job={job} />
        </div>
      </div>
    </>
  );
}
