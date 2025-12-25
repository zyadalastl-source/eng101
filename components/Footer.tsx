import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-meu-dark/10 bg-meu-dark text-meu-white">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold">ENG101.com</div>
            <div className="mt-2 text-xs text-meu-gray">—</div>
          </div>
          <div>
            <div className="text-sm font-semibold">روابط</div>
            <div className="mt-2 space-y-2 text-xs text-meu-gray">
              <div>—</div>
              <div>—</div>
              <div>—</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">معلومات</div>
            <div className="mt-2 space-y-2 text-xs text-meu-gray">
              <div>—</div>
              <div>—</div>
            </div>
          </div>
        </div>
        <div className="border-t border-meu-white/10 py-4 text-center text-xs text-meu-gray">
          — 
        </div>
      </Container>
    </footer>
  );
}
