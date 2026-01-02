export function countTokens(text: string): number {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
}

export function calculateCost(tokens: number, ratePerMil: number): number {
    return (tokens / 1000000) * ratePerMil;
}
