'use client';

import { useState } from 'react';
import { ModelCard } from '@/components/common/ModelCard';
import { ModelDetailModal } from '@/components/models/ModelDetailModal';
import { SlideInFromSides } from '@/components/models/SlideInFromSides';

interface ModelData {
  _id: string;
  slug: string;
  name: string;
  priceLabel: string;
  rangeKm?: number;
  chargeTime?: string;
  highlights: string[];
  images?: string[];
  specs?: Record<string, string>;
}

interface ModelsGridWithModalProps {
  models: ModelData[];
  imageFallbacks: [string, string];
  galleryFallbacks: [string[], string[]];
}

export function ModelsGridWithModal({
  models,
  imageFallbacks,
  galleryFallbacks
}: ModelsGridWithModalProps) {
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const model1 = models[0];
  const model2 = models[1];
  if (!model1 || !model2) return null;

  const images1 = model1.images?.length ? model1.images : galleryFallbacks[0];
  const images2 = model2.images?.length ? model2.images : galleryFallbacks[1];

  return (
    <>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <SlideInFromSides side="left" delay={150}>
          <ModelCard
            slug={model1.slug}
            name={model1.name}
            priceLabel={model1.priceLabel}
            rangeKm={model1.rangeKm}
            chargeTime={model1.chargeTime}
            highlights={model1.highlights}
            image={model1.images?.[0] ?? imageFallbacks[0]}
            images={images1}
            onViewDetails={() => setSelectedModel(model1)}
          />
        </SlideInFromSides>
        <SlideInFromSides side="right" delay={250}>
          <ModelCard
            slug={model2.slug}
            name={model2.name}
            priceLabel={model2.priceLabel}
            rangeKm={model2.rangeKm}
            chargeTime={model2.chargeTime}
            highlights={model2.highlights}
            image={model2.images?.[0] ?? imageFallbacks[1]}
            images={images2}
            onViewDetails={() => setSelectedModel(model2)}
          />
        </SlideInFromSides>
      </section>

      {selectedModel && (
        <ModelDetailModal
          name={selectedModel.name}
          slug={selectedModel.slug}
          priceLabel={selectedModel.priceLabel}
          rangeKm={selectedModel.rangeKm}
          chargeTime={selectedModel.chargeTime}
          highlights={selectedModel.highlights}
          images={
            selectedModel.images?.length
              ? selectedModel.images
              : selectedModel.slug === model2.slug
                ? galleryFallbacks[1]
                : galleryFallbacks[0]
          }
          specs={selectedModel.specs}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </>
  );
}
