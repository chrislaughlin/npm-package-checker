export interface Vuln {
    id: string;
    title: string;
    description: string;
    cvssScore: number;
    cwe: string;
    reference: string;
    cvssVector: string;
    cve: string;
}

export interface VulnerablePackage {
    pkg: string;
    pkgDescription: string;
    vulns: Vuln[];
}
