import { useQuery } from "@apollo/client/react";
import { GET_NPM_PACKAGES } from "../graphql/queries";
import type { NpmPackage } from "../types/NpmPackage";

interface NpmPackagesData {
  npmPackages: NpmPackage[];
}

export default function NpmPackageCard() {
  const { data, loading } = useQuery<NpmPackagesData>(GET_NPM_PACKAGES);

  if (loading) return <p className="p-4">Loading packages...</p>;

  return (
    <div className="p-4">
      {data?.npmPackages.map((pkg) => (
        <div key={pkg.name} className="mb-4 p-4 border rounded shadow-sm bg-white">
          <h3 className="text-lg font-bold text-gray-800">
            {pkg.name} <span className="text-sm text-gray-500">({pkg.version})</span>
          </h3>
          <p className="text-gray-700">{pkg.description ?? "No description available."}</p>
          <p className="text-sm text-gray-600">Author: {pkg.author}</p>
          <p className="text-sm text-blue-600">
            Weekly Downloads: {pkg.weeklyDownloads.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}